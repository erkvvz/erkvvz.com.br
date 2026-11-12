/* ==========================================================================
   Escultura "No ties" · página inicial

   Um nó de metal que se desata: começa amarrado em si mesmo e, aos poucos,
   se solta num fio livre. Vem do meu antigo nome artístico, "No ties"
   ("sem amarras").

   Comportamento:
   - respira sozinho: se solta e se fecha, devagar;
   - rolar a página para baixo solta; para cima, fecha;
   - inclina e muda a luz conforme o mouse.

   Este arquivo só é carregado quando o aparelho pode (ver inicio.js).
   O protótipo com controles fica no laboratório privado.
   ========================================================================== */

import * as THREE from 'three';

/* ---- Valores escolhidos no laboratório ----------------------------------- */

const AJUSTES = {
  tamanho: 1.3,
  deformacao: 0.10,
  frequencia: 0.73,
  velocidade: 1.1,
  rugosidade: 0.32,
  luzVinho: 6,
};
const ajustes = AJUSTES; // usado pela função de ambiente

const VINHO = new THREE.Color('#702638');
const VINHO_CLARO = new THREE.Color('#C05A72');

const ehCelular = matchMedia('(max-width: 48rem), (hover: none) and (pointer: coarse)').matches;

/* ---- Os dois caminhos do fio ---------------------------------------------
   Uma "curva" é uma linha no espaço 3D. O tubo de metal é construído em volta
   dela. Temos duas: o nó (amarrado) e o fio livre (desatado). O mesmo ponto t
   do fio (de 0 a 1) existe nas duas, então dá para ir de uma à outra. */

class CurvaNo extends THREE.Curve {
  // Nó toroidal: o fio dá p voltas num sentido e q no outro antes de fechar
  constructor(p = 2, q = 3, raio = 1) { super(); this.p = p; this.q = q; this.raio = raio; }
  getPoint(t, alvo = new THREE.Vector3()) {
    const u = t * this.p * Math.PI * 2;
    const qu = (this.q / this.p) * u;
    const r = this.raio * (2 + Math.cos(qu)) * 0.5;
    return alvo.set(r * Math.cos(u), r * Math.sin(u), this.raio * Math.sin(qu) * 0.5);
  }
}

class CurvaLivre extends THREE.Curve {
  // Fio solto: uma espiral aberta que sobe e se afrouxa, com uma leve ondulação
  getPoint(t, alvo = new THREE.Vector3()) {
    const angulo = t * Math.PI * 2 * 1.25;
    const raio = 0.35 + 1.2 * t;
    return alvo.set(
      Math.cos(angulo) * raio - 0.15,
      (t - 0.5) * 2.8 + 0.25 * Math.sin(t * Math.PI * 6),
      Math.sin(angulo) * raio * 0.6
    );
  }
}

/* ---- Geometria ------------------------------------------------------------ */

// Guarda, para cada vértice, o centro do fio naquele trecho (serve para afinar as pontas)
function centrosDoTubo(curva, segmentos, radiais) {
  const centros = new Float32Array((segmentos + 1) * (radiais + 1) * 3);
  const p = new THREE.Vector3();
  for (let i = 0; i <= segmentos; i++) {
    curva.getPointAt(i / segmentos, p);
    for (let j = 0; j <= radiais; j++) p.toArray(centros, (i * (radiais + 1) + j) * 3);
  }
  return new THREE.BufferAttribute(centros, 3);
}

function criarGeometria() {
  const segmentos = ehCelular ? 260 : 600;   // pedaços ao longo do fio
  const radiais = ehCelular ? 28 : 56;       // pedaços em volta do fio
  const espessura = 0.28;
  const no = new CurvaNo(2, 3, 1);
  const livre = new CurvaLivre();

  const g = new THREE.TubeGeometry(no, segmentos, espessura, radiais, true);
  const gLivre = new THREE.TubeGeometry(livre, segmentos, espessura, radiais, false);

  // A geometria do nó carrega também a forma livre, como atributos extras
  g.setAttribute('posLivre', gLivre.attributes.position);
  g.setAttribute('normLivre', gLivre.attributes.normal);
  g.setAttribute('centroNo', centrosDoTubo(no, segmentos, radiais));
  g.setAttribute('centroLivre', centrosDoTubo(livre, segmentos, radiais));
  gLivre.dispose();
  return g;
}

/* ---- Shader: ruído + transição nó → fio livre ----------------------------
   GLSL é a linguagem dos "shaders", programas que rodam na placa de vídeo.
   Aqui ele: (1) mistura a forma do nó com a do fio livre, (2) afina as pontas
   quando o fio se solta, (3) faz a superfície ondular com ruído e
   (4) recalcula para onde a superfície aponta, para a luz refletir certo. */

const ruidoGLSL = /* glsl */ `
  // Ruído simplex 3D (Ashima Arts, licença MIT)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  attribute vec3 posLivre;
  attribute vec3 normLivre;
  attribute vec3 centroNo;
  attribute vec3 centroLivre;

  uniform float uTempo;
  uniform float uDeformacao;
  uniform float uFrequencia;
  uniform float uSoltura;   // 0 = amarrado, 1 = livre
  uniform float uAfinar;    // 1 = pontas afinam ao soltar; 0 = não (esfera)

  vec3 deslocar(vec3 p, vec3 n) {
    float onda = snoise(p * uFrequencia + vec3(0.0, uTempo * 0.12, uTempo * 0.08));
    onda += 0.35 * snoise(p * uFrequencia * 2.3 - vec3(uTempo * 0.1));
    return p + n * onda * uDeformacao;
  }
`;

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

  painel(8, 2.5, new THREE.Color(1, 1, 1), 3, [0, 7, 2]);                       // luz branca de cima
  painel(1.2, 9, VINHO, ajustes.luzVinho, [-7, 0, 1]);                           // faixa vinho à esquerda
  painel(0.8, 7, VINHO_CLARO, ajustes.luzVinho * 0.5, [6, 1, -3]);              // faixa vinho clara atrás
  painel(0.4, 8, new THREE.Color(0.75, 0.85, 1), 1.6, [7, -1, 3]);              // faixa fria, fina, à direita
  painel(10, 6, new THREE.Color(1, 1, 1), 0.35, [-3, -2, 8]);                    // luz branca suave pela frente

  const pmrem = new THREE.PMREMGenerator(renderer);
  const textura = pmrem.fromScene(sala, 0.035).texture;
  pmrem.dispose();
  return textura;
}

/* ---- Preparação em etapas ------------------------------------------------
   Montar a escultura dá trabalho: criar a forma, gerar a "sala" de reflexo e
   compilar o shader na placa de vídeo. Feito tudo de uma vez, isso trava a
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
 * @param {{ aoPrimeiroQuadro?: () => void }} opcoes
 */
export async function iniciarEscultura(canvas, { aoPrimeiroQuadro } = {}) {
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

  const uniforms = {
    uTempo: { value: 0 },
    uDeformacao: { value: AJUSTES.deformacao },
    uFrequencia: { value: AJUSTES.frequencia },
    uSoltura: { value: 0 },
    uAfinar: { value: 1 },
  };

  /* Dois materiais para o mesmo metal:
     - no computador, o material físico completo, que calcula os reflexos
       da sala de luz a cada quadro (bonito, mas pesado de preparar);
     - no celular, um "matcap": uma imagem de uma esfera desse mesmo metal,
       renderizada antes. O shader só consulta a imagem, então é muito mais
       leve de compilar e de desenhar. O visual fica bem parecido. */
  let material;
  if (ehCelular) {
    const matcap = await new THREE.TextureLoader().loadAsync(new URL('../img/matcap-no-ties.webp', import.meta.url).href);
    matcap.colorSpace = THREE.SRGBColorSpace;
    material = new THREE.MeshMatcapMaterial({ matcap, side: THREE.DoubleSide });
    material.toneMapped = false; // a imagem já tem o tratamento de cor aplicado
  } else {
    material = new THREE.MeshPhysicalMaterial({
      color: 0xb4b4b4,
      metalness: 1,
      roughness: AJUSTES.rugosidade,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      side: THREE.DoubleSide,
    });
  }

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${ruidoGLSL}`)
      .replace('#include <beginnormal_vertex>', /* glsl */ `
        // Suaviza a transição: começa e termina devagar
        float s = smoothstep(0.0, 1.0, uSoltura);

        // 1. Mistura o nó com o fio livre
        vec3 centro = mix(centroNo, centroLivre, s);
        vec3 base = mix(position, posLivre, s);
        vec3 nBase = normalize(mix(normal, normLivre, s));

        // 2. Quando o fio se solta, ele fica mais fino e leve, e as pontas afinam
        //    (uv.x vai de 0 a 1 ao longo do fio)
        float ponta = smoothstep(0.0, 0.14, uv.x) * smoothstep(1.0, 0.86, uv.x);
        float leveza = mix(1.0, 0.6, s);
        base = centro + (base - centro) * mix(1.0, ponta * leveza, s * uAfinar);

        // 3. Ondula a superfície e 4. recalcula a normal com dois vizinhos
        vec3 pDesl = deslocar(base, nBase);
        vec3 tg = abs(nBase.y) < 0.99 ? normalize(cross(nBase, vec3(0.0, 1.0, 0.0))) : normalize(cross(nBase, vec3(1.0, 0.0, 0.0)));
        vec3 bt = cross(nBase, tg);
        float e = 0.01;
        vec3 pT = deslocar(base + tg * e, nBase);
        vec3 pB = deslocar(base + bt * e, nBase);
        vec3 objectNormal = normalize(cross(pT - pDesl, pB - pDesl));
      `)
      .replace('#include <begin_vertex>', 'vec3 transformed = pDesl;');
  };

  const grupo = new THREE.Group();
  const malha = new THREE.Mesh(criarGeometria(), material);   // etapa 2: a forma (no processador)
  await respirar();
  malha.frustumCulled = false; // a forma muda no shader; evita sumir nas bordas da tela
  grupo.add(malha);
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
     Sozinha, ela avança: o nó se solta e depois se fecha.
     Rolando a página: para baixo solta, para cima fecha. Ao parar, a
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
    let s = 0.5 - 0.5 * Math.cos(fase);
    s = Math.min(Math.max(s + deltaRolagem * 0.0015, 0), 1);   // ~670 px de rolagem = do fechado ao solto
    const meio = Math.acos(1 - 2 * s);
    fase = deltaRolagem > 0 ? meio : Math.PI * 2 - meio;
  }

  /* ---- Loop de animação ---- */
  const relogio = new THREE.Clock();
  let giro = 0;
  let solturaAtual = 0;
  let primeiro = true;

  // Atualiza o estado (tempo, giro, soltura, mouse) sem desenhar
  function atualizar(dt) {
    uniforms.uTempo.value += dt * AJUSTES.velocidade;
    giro += dt * 0.12 * AJUSTES.velocidade;

    if (estaRolando()) aplicarRolagem();
    else fase += dt * 0.35 * AJUSTES.velocidade;
    deltaRolagem = 0;

    solturaAtual += ((0.5 - 0.5 * Math.cos(fase)) - solturaAtual) * 0.06;
    uniforms.uSoltura.value = solturaAtual;

    grupo.rotation.y += (giro + alvo.x * 0.35 - grupo.rotation.y) * 0.04;
    grupo.rotation.x += (alvo.y * 0.25 - grupo.rotation.x) * 0.04;
    luzMouse.position.x += (alvo.x * 4 - luzMouse.position.x) * 0.06;
    luzMouse.position.y += (-alvo.y * 3 - luzMouse.position.y) * 0.06;
    cena.environmentRotation.y = giro * 0.5;
  }

  /* A imagem estática da página foi tirada da escultura depois de 2,6 s de
     movimento. Avançamos o estado até esse mesmo instante antes do primeiro
     quadro: assim, quando o 3D aparece por cima da imagem, as duas estão na
     mesma posição e a troca não se nota. */
  for (let i = 0; i < 156; i++) atualizar(1 / 60);

  function desenhar() {
    atualizar(Math.min(relogio.getDelta(), 0.05));     // evita saltos depois de pausas
    renderer.render(cena, camera);

    if (primeiro) { primeiro = false; aoPrimeiroQuadro?.(); }
  }

  function loop() {
    if (!document.hidden && visivelNaTela) desenhar();
    else relogio.getDelta();                           // descarta o tempo parado
    requestAnimationFrame(loop);
  }
  // Etapa pesada 3: compila o shader antes do primeiro quadro. compileAsync
  // usa a compilação em paralelo da placa de vídeo quando o navegador oferece.
  await esperarRolagemParar();
  await renderer.compileAsync(cena, camera);
  await respirar();

  requestAnimationFrame(loop);
}
