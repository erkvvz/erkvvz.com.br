/* ==========================================================================
   Página inicial: decide se a escultura 3D deve carregar.

   A página já chega completa, com uma imagem estática da escultura.
   O 3D só entra por cima dela, depois que todo o resto carregou, e
   apenas quando faz sentido. Em qualquer outro caso, a imagem fica.
   ========================================================================== */

const caixa = document.querySelector('.escultura');
const canvas = caixa?.querySelector('canvas');

function podeCarregar3D() {
  if (!canvas) return false;

  // Quem pediu menos movimento no sistema vê a imagem parada
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  // Quem ativou economia de dados no celular não baixa o 3D
  if (navigator.connection?.saveData) return false;

  // O navegador precisa saber desenhar 3D (WebGL 2)
  try {
    if (!document.createElement('canvas').getContext('webgl2')) return false;
  } catch {
    return false;
  }

  return true;
}

/* ---- Esperar um momento de sossego ---------------------------------------
   Preparar o Three.js (671 KB de código) ocupa o navegador por um instante,
   e isso não dá para dividir. No celular, esse instante é sentido como uma
   travadinha. A saída: começar só quando a pessoa ficar um tempo sem mexer
   na página (lendo a frase, por exemplo). Aí a travada acontece quando nada
   na tela está se movendo, e ninguém percebe. Até lá, a imagem está no lugar. */

const ehCelular = matchMedia('(max-width: 48rem), (hover: none) and (pointer: coarse)').matches;
const SOSSEGO_MS = ehCelular ? 2000 : 400;   // no computador a preparação é rápida

// Qualquer toque, rolagem, clique ou tecla conta como "mexendo"
let ultimoMovimento = performance.now();
for (const evento of ['scroll', 'touchstart', 'touchmove', 'pointerdown', 'wheel', 'keydown']) {
  window.addEventListener(evento, () => { ultimoMovimento = performance.now(); }, { passive: true });
}

async function esperarSossego() {
  while (performance.now() - ultimoMovimento < SOSSEGO_MS) {
    await new Promise((pronto) => setTimeout(pronto, 200));
  }
}

async function carregar() {
  try {
    await esperarSossego();
    const { iniciarEscultura } = await import('./escultura.js');
    // A montagem é feita em etapas (ver escultura.js); o await espera todas
    await iniciarEscultura(canvas, {
      // Só troca a imagem pelo 3D quando o primeiro quadro já foi desenhado
      aoPrimeiroQuadro: () => caixa.classList.add('escultura--viva'),
    });
  } catch (erro) {
    // Se algo falhar, a imagem estática continua lá. Nada quebra.
    console.warn('Escultura 3D não carregou; mantendo a imagem.', erro);
  }
}

// Espera a página terminar de carregar e o navegador ficar livre
function quandoLivre(acao) {
  const agendar = () => ('requestIdleCallback' in window ? requestIdleCallback(acao, { timeout: 2000 }) : setTimeout(acao, 200));
  if (document.readyState === 'complete') agendar();
  else window.addEventListener('load', agendar, { once: true });
}

if (podeCarregar3D()) quandoLivre(carregar);
