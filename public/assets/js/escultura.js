/* ==========================================================================
   Escultura "Sorrisos" · página inicial (decisão 0017)

   Um yin yang de metal: uma metade prata polida e outra vinho, cada uma com
   um ponto da outra dentro, e um sorriso vermelho de dentes de ouro em cada
   metade (frente e verso). Vem das referências do Erick: a dualidade, as
   "duas faces", o yin yang pintado com dois sorrisos e a cultura do rap.

   Comportamento:
   - respira sozinha: as metades se afastam, giram e se encaixam de novo;
   - rolar a página para baixo afasta; para cima, encaixa;
   - inclina e muda a luz conforme o mouse;
   - fica calma e apagada até o visitante interagir (decisão 0016).

   Este arquivo só é carregado quando o aparelho pode (ver inicio.js).
   O protótipo com todas as formas fica no laboratório privado.
   ========================================================================== */

import * as THREE from 'three';

/* ---- Valores escolhidos no laboratório ----------------------------------- */

const AJUSTES = {
  tamanho: 1.3,       // aproximação da câmera
  velocidade: 1.8,    // escolhida no laboratório (o nó usava 0.6)
  rugosidade: 0.32,   // metal da sala de reflexo
  luzVinho: 6,        // força das faixas vinho na sala de reflexo
};

const VINHO = new THREE.Color('#702638');
const VINHO_CLARO = new THREE.Color('#C05A72');
const TAU = Math.PI * 2;

const ehCelular = matchMedia('(max-width: 48rem), (hover: none) and (pointer: coarse)').matches;

// Começa e termina devagar (0 → 1)
const suave = (x) => x * x * (3 - 2 * x);

/* ---- A forma --------------------------------------------------------------
   Cada metade é um desenho 2D (Shape) "extrudado": ganha espessura, como um
   biscoito cortado com forma, com as bordas arredondadas (bevel). */

function montarSorrisos(grupo, criarMetal) {
  const leve = ehCelular;   // no celular, menos detalhes nas curvas
  const R = 1.15, prof = 0.32;

  // Metade "yin": a metade esquerda do círculo, mais a barriga embaixo, menos o recorte em cima
  const contorno = new THREE.Shape();
  contorno.moveTo(0, R);
  contorno.absarc(0, 0, R, Math.PI / 2, Math.PI * 1.5, false);
  contorno.absarc(0, -R / 2, R / 2, -Math.PI / 2, Math.PI / 2, false);
  contorno.absarc(0, R / 2, R / 2, -Math.PI / 2, Math.PI / 2, true);
  const furo = new THREE.Path();                     // o buraco onde entra o ponto da outra cor
  furo.absarc(0, -R / 2, R / 7, 0, TAU, true);
  contorno.holes.push(furo);

  const opcoes = { depth: prof, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: leve ? 3 : 6, curveSegments: leve ? 48 : 96 };
  const geoA = new THREE.ExtrudeGeometry(contorno, opcoes);
  geoA.translate(0, 0, -prof / 2);                   // centraliza na espessura
  const geoB = geoA.clone().rotateZ(Math.PI);        // a outra metade é a mesma, girada meia volta
  const ponto = new THREE.CylinderGeometry(R / 7 - 0.03, R / 7 - 0.03, prof + 0.1, leve ? 32 : 64).rotateX(Math.PI / 2);

  const prata = criarMetal({ cor: 0xdedede, rugosidade: 0.1 });
  const vinho = criarMetal({ cor: 0x8a2c44, corCelular: 0xb0506a, rugosidade: 0.35 });
  const vermelho = criarMetal({ cor: 0xc0182c, corCelular: 0xe0303f, rugosidade: 0.3 });
  const ouro = criarMetal({ cor: 0xd8a84a, corCelular: 0xf0c060, rugosidade: 0.15 });

  // Cada lado: a metade, com o ponto da outra cor no buraco
  const lado = (geo, matLado, matPonto, py) => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geo, matLado));
    const p = new THREE.Mesh(ponto, matPonto);
    p.position.y = py;
    g.add(p);
    grupo.add(g);
    return g;
  };
  const a = lado(geoA, prata, vinho, -R / 2);
  const b = lado(geoB, vinho, prata, R / 2);

  // O sorriso: uma meia-lua vermelha com cinco dentes de ouro, na frente e no verso
  const boca = new THREE.Shape();
  boca.moveTo(Math.cos(Math.PI + 0.4) * 0.34, Math.sin(Math.PI + 0.4) * 0.34);
  boca.absarc(0, 0, 0.34, Math.PI + 0.4, TAU - 0.4, false);
  boca.absarc(0, 0.12, 0.3, TAU - 0.55, Math.PI + 0.55, true);
  const geoBoca = new THREE.ExtrudeGeometry(boca, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.012, bevelSegments: 2, curveSegments: leve ? 24 : 48 });
  const geoDente = new THREE.BoxGeometry(0.075, 0.085, 0.03);
  const sorriso = (g, x, y) => {
    for (const face of [1, -1]) {                    // frente e verso
      const s = new THREE.Group();
      s.add(new THREE.Mesh(geoBoca, vermelho));
      for (let i = 0; i < 5; i++) {
        const ang = Math.PI + 0.95 + (i / 4) * (Math.PI - 1.9);
        const d = new THREE.Mesh(geoDente, ouro);
        d.position.set(Math.cos(ang) * 0.255, Math.sin(ang) * 0.255 + 0.035, 0.03);
        d.rotation.z = ang + Math.PI / 2;
        s.add(d);
      }
      s.position.set(x, y, face * (prof / 2 + 0.065));
      if (face < 0) s.rotation.y = Math.PI;
      g.add(s);
    }
  };
  sorriso(a, -0.52, -0.02);
  sorriso(b, 0.52, 0.12);

  // A cada quadro: as metades se afastam e giram conforme a "soltura" (0 = encaixadas)
  return (soltura) => {
    const s = suave(soltura);
    a.position.set(-0.45 * s, 0, 0.2 * s); a.rotation.z = 0.6 * s;
    b.position.set(0.45 * s, 0, -0.2 * s); b.rotation.z = 0.6 * s;
  };
}

/* ---- Ambiente de reflexo -------------------------------------------------
   Metal não tem cor própria: ele mostra o que está ao redor. Então criamos
   uma "sala" invisível com painéis de luz (branca, vinho e fria). A escultura
   reflete essa sala. É daí que vêm os brilhos vinho na superfície. */

function criarAmbiente(renderer) {
  const sala = new THREE.Scene();
  sala.add(new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0x050505, side: THREE.BackSide })
  ));

  const painel = (largura, altura, cor, intensidade, posicao) => {
    const malha = new THREE.Mesh(
      new THREE.PlaneGeometry(largura, altura),
      new THREE.MeshBasicMaterial({ color: cor.clone().multiplyScalar(intensidade), side: THREE.DoubleSide })
    );
    malha.position.set(...posicao);
    malha.lookAt(0, 0, 0);
    sala.add(malha);
  };

  painel(8, 2.5, new THREE.Color(1, 1, 1), 3, [0, 7, 2]);                        // luz branca de cima
  painel(1.2, 9, VINHO, AJUSTES.luzVinho, [-7, 0, 1]);                            // faixa vinho à esquerda
  painel(0.8, 7, VINHO_CLARO, AJUSTES.luzVinho * 0.5, [6, 1, -3]);               // faixa vinho clara atrás
  painel(0.4, 8, new THREE.Color(0.75, 0.85, 1), 1.6, [7, -1, 3]);               // faixa fria, fina, à direita
  painel(10, 6, new THREE.Color(1, 1, 1), 0.35, [-3, -2, 8]);                     // luz branca suave pela frente

  const pmrem = new THREE.PMREMGenerator(renderer);
  const textura = pmrem.fromScene(sala, 0.035).texture;
  pmrem.dispose();
  return textura;
}

/* ---- Preparação em etapas ------------------------------------------------
   Montar a escultura dá trabalho: criar a forma, gerar a "sala" de reflexo e
   compilar os shaders na placa de vídeo. Feito tudo de uma vez, isso trava a
   página por um instante (no celular, dá para sentir). Por isso a montagem é
   dividida em etapas, com uma pausa entre elas para o navegador respirar,
   e as etapas pesadas esperam a pessoa parar de rolar a página. */

let ultimaRolagemGlobal = -Infinity;
window.addEventListener('scroll', () => { ultimaRolagemGlobal = performance.now(); }, { passive: true });

// Devolve a vez ao navegador até ele ficar livre
const respirar = () => new Promise((pronto) => {
  if ('requestIdleCallback' in window) requestIdleCallback(() => pronto(), { timeout: 600 });
  else setTimeout(pronto, 60);
});

// Espera a página ficar parada (sem rolagem) por pelo menos 300 ms
async function esperarRolagemParar() {
  while (performance.now() - ultimaRolagemGlobal < 300) {
    await new Promise((pronto) => setTimeout(pronto, 120));
  }
}

/* ---- Montagem ------------------------------------------------------------ */

/**
 * Liga a escultura a um <canvas>. É assíncrona: monta em etapas e só começa
 * a desenhar quando tudo está pronto.
 * @param {HTMLCanvasElement} canvas
 * @param {{ aoPrimeiroQuadro?: () => void, aoMudarEnergia?: (energia: number) => void }} opcoes
 */
export async function iniciarEscultura(canvas, { aoPrimeiroQuadro, aoMudarEnergia } = {}) {
  /* ---- A escultura acorda quando o visitante está presente ----
     Ela começa quase parada e apagada ("energia" 0). Quando a pessoa rola,
     toca, mexe o mouse ou aperta uma tecla, ela acorda (energia 1): ganha
     brilho e volta a se mexer. Depois de alguns segundos sem interação, ela
     se acalma de novo. O brilho é aplicado pela página (aoMudarEnergia);
     aqui fica o movimento. */
  const SEGUNDOS_ACORDADA = 6;
  let ultimaInteracao = -Infinity;
  let energia = 0;
  for (const ev of ['scroll', 'pointermove', 'touchstart', 'wheel', 'keydown']) {
    window.addEventListener(ev, () => { ultimaInteracao = performance.now(); }, { passive: true });
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !ehCelular, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, ehCelular ? 1 : 1.5)); // limita a resolução

  const cena = new THREE.Scene();

  // Etapa pesada 1: a sala de reflexo (desenhada na placa de vídeo).
  // No celular ela não é gerada: o reflexo vem pronto numa imagem (matcap).
  await respirar();
  await esperarRolagemParar();
  if (!ehCelular) cena.environment = criarAmbiente(renderer);
  await respirar();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 8.5 / AJUSTES.tamanho);

  /* Dois tipos de metal:
     - no computador, o material físico completo, que calcula os reflexos
       da sala de luz a cada quadro (bonito, mas pesado de preparar);
     - no celular, um "matcap": uma imagem de uma esfera de metal, renderizada
       antes e tingida com a cor de cada peça. O shader só consulta a imagem,
       então é muito mais leve de compilar e de desenhar. */
  let matcap = null;
  if (ehCelular) {
    matcap = await new THREE.TextureLoader().loadAsync(new URL('../img/matcap-metal.webp', import.meta.url).href);
    matcap.colorSpace = THREE.SRGBColorSpace;
  }
  function criarMetal({ cor = 0xb4b4b4, corCelular = 0xffffff, rugosidade = AJUSTES.rugosidade } = {}) {
    if (ehCelular) {
      const m = new THREE.MeshMatcapMaterial({ matcap, color: corCelular, side: THREE.DoubleSide });
      m.toneMapped = false; // a imagem já tem o tratamento de cor aplicado
      return m;
    }
    return new THREE.MeshPhysicalMaterial({
      color: cor, metalness: 1, roughness: rugosidade,
      clearcoat: 1, clearcoatRoughness: 0.12, side: THREE.DoubleSide,
    });
  }

  // Etapa 2: a forma (no processador)
  const grupo = new THREE.Group();
  const moverPecas = montarSorrisos(grupo, criarMetal);
  await respirar();
  cena.add(grupo);

  // Uma luz vinho que segue o mouse
  const luzMouse = new THREE.PointLight(VINHO_CLARO, 18, 12, 1.6);
  luzMouse.position.set(2, 1, 3);
  cena.add(luzMouse);

  /* ---- Tamanho: acompanha o canvas na página ---- */
  function ajustarTamanho() {
    const { clientWidth: l, clientHeight: a } = canvas;
    if (!l || !a) return;
    renderer.setSize(l, a, false);
    camera.aspect = l / a;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(ajustarTamanho).observe(canvas);
  ajustarTamanho();

  /* ---- Mouse: guarda o alvo; o movimento é suavizado no loop ---- */
  const alvo = { x: 0, y: 0 };
  window.addEventListener('pointermove', (ev) => {
    alvo.x = (ev.clientX / innerWidth) * 2 - 1;
    alvo.y = (ev.clientY / innerHeight) * 2 - 1;
  }, { passive: true });

  /* ---- Pausa quando a escultura sai da tela ---- */
  let visivelNaTela = true;
  new IntersectionObserver(([entrada]) => { visivelNaTela = entrada.isIntersecting; }).observe(canvas);

  /* ---- Respiração e rolagem ----
     "fase" é a posição no ciclo da respiração (uma volta = 2π).
     Sozinha, ela avança: as metades se afastam e depois se encaixam.
     Rolando a página: para baixo afasta, para cima encaixa. Ao parar, a
     respiração continua no mesmo sentido em que a rolagem ia. */
  let fase = 0;
  let momentoDaRolagem = -Infinity;
  let deltaRolagem = 0;
  let ultimaRolagem = window.scrollY;
  window.addEventListener('scroll', () => {
    momentoDaRolagem = performance.now();
    deltaRolagem += window.scrollY - ultimaRolagem;
    ultimaRolagem = window.scrollY;
  }, { passive: true });
  const estaRolando = () => performance.now() - momentoDaRolagem < 150;

  function aplicarRolagem() {
    if (!deltaRolagem) return;
    // Limita o efeito de cada quadro: um salto grande de rolagem (por exemplo,
    // o navegador voltando para onde a página estava) não faz a escultura "pular"
    const delta = Math.max(-60, Math.min(60, deltaRolagem));
    let s = 0.5 - 0.5 * Math.cos(fase);
    s = Math.min(Math.max(s + delta * 0.0015, 0), 1);   // ~670 px de rolagem = do encaixado ao afastado
    const meio = Math.acos(1 - 2 * s);
    fase = deltaRolagem > 0 ? meio : Math.PI * 2 - meio;
  }

  /* ---- Loop de animação ---- */
  const relogio = new THREE.Clock();
  let giro = 0;
  let solturaAtual = 0;
  let primeiro = true;

  /* O mouse e a rolagem só passam a influenciar DEPOIS que o 3D aparece, e o
     mouse entra aos poucos (em 1,5 s). Antes disso, a escultura segue
     exatamente o caminho da imagem estática, para as duas coincidirem. */
  let preparando = true;
  let influenciaMouse = 0;

  // Atualiza o estado (giro, soltura, mouse) sem desenhar
  function atualizar(dt) {
    if (!preparando) {
      const acordada = performance.now() - ultimaInteracao < SEGUNDOS_ACORDADA * 1000;
      // acorda rápido (~0,8 s) e se acalma devagar (~3 s)
      energia += ((acordada ? 1 : 0) - energia) * Math.min(dt * (acordada ? 2.5 : 0.7), 1);
      aoMudarEnergia?.(energia);
      dt *= 0.04 + 0.96 * energia;   // calma, ela fica quase parada
    }
    giro += dt * 0.12 * AJUSTES.velocidade;

    if (!preparando && estaRolando()) aplicarRolagem();
    else fase += dt * 0.35 * AJUSTES.velocidade;
    deltaRolagem = 0;

    if (!preparando) influenciaMouse = Math.min(influenciaMouse + dt / 1.5, 1);
    const mx = alvo.x * influenciaMouse;
    const my = alvo.y * influenciaMouse;

    solturaAtual += ((0.5 - 0.5 * Math.cos(fase)) - solturaAtual) * 0.06;
    moverPecas(solturaAtual);

    grupo.rotation.y += (giro + mx * 0.35 - grupo.rotation.y) * 0.04;
    grupo.rotation.x += (my * 0.25 - grupo.rotation.x) * 0.04;
    luzMouse.position.x += (mx * 4 - luzMouse.position.x) * 0.06;
    luzMouse.position.y += (-my * 3 - luzMouse.position.y) * 0.06;
    cena.environmentRotation.y = giro * 0.5;
  }

  /* A imagem estática da página foi tirada da escultura depois de 2,6 s de
     movimento. Avançamos o estado até esse mesmo instante antes do primeiro
     quadro: assim, quando o 3D aparece por cima da imagem, as duas estão na
     mesma posição e a troca não se nota. */
  for (let i = 0; i < 156; i++) atualizar(1 / 60);

  function desenhar() {
    if (primeiro) {
      // Primeiro quadro: exatamente a pose da imagem (sem mouse, sem rolagem)
      deltaRolagem = 0;
      renderer.render(cena, camera);
      relogio.getDelta();                              // zera o relógio da preparação
      preparando = false;
      primeiro = false;
      aoMudarEnergia?.(energia);
      aoPrimeiroQuadro?.();
      return;
    }
    atualizar(Math.min(relogio.getDelta(), 0.05));     // evita saltos depois de pausas
    renderer.render(cena, camera);
  }

  let contador = 0;
  function loop() {
    contador++;
    const calma = !primeiro && energia < 0.05;
    if (calma && contador % 4 !== 0) { /* calma: pula o quadro (economiza bateria); o tempo acumula para o próximo */ }
    else if (!document.hidden && visivelNaTela) desenhar();
    else relogio.getDelta();                           // descarta o tempo parado
    requestAnimationFrame(loop);
  }
  // Etapa pesada 3: compila os shaders antes do primeiro quadro. compileAsync
  // usa a compilação em paralelo da placa de vídeo quando o navegador oferece.
  await esperarRolagemParar();
  await renderer.compileAsync(cena, camera);
  await respirar();

  requestAnimationFrame(loop);
}
