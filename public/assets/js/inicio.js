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

// Guarda o momento da última rolagem, para não começar nada pesado no meio de um gesto
let ultimaRolagem = -Infinity;
window.addEventListener('scroll', () => { ultimaRolagem = performance.now(); }, { passive: true });

async function esperarRolagemParar() {
  while (performance.now() - ultimaRolagem < 400) {
    await new Promise((pronto) => setTimeout(pronto, 150));
  }
}

async function carregar() {
  try {
    // Baixar e preparar o Three.js também ocupa o navegador por um instante:
    // espera a página ficar parada antes de começar
    await esperarRolagemParar();
    const { iniciarEscultura } = await import('./escultura.js');
    // A montagem é feita em etapas (ver escultura.js); o await espera todas
    await iniciarEscultura(canvas, {
      // Só troca a imagem pelo 3D quando o primeiro quadro já foi desenhado
      aoPrimeiroQuadro: () => caixa.classList.add('escultura--viva'),
      // O brilho acompanha a "energia" da escultura (0 calma, 1 acordada)
      aoMudarEnergia: (energia) => caixa.style.setProperty('--energia', energia.toFixed(3)),
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

if (podeCarregar3D()) {
  // A imagem já fica "calma" (apagada), igual ao 3D quando ele começar
  caixa.classList.add('escultura--acordavel');
  quandoLivre(carregar);
}
