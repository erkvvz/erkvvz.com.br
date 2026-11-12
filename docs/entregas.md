# Diário de entregas

Registro do que fiz em cada entrega do projeto, dos problemas que apareceram e de como resolvi. O planejamento completo está em [`01-proposta-inicial.md`](01-proposta-inicial.md) e as decisões técnicas em [`decisoes/`](decisoes/).

---

## Entrega 1: ambiente de desenvolvimento

**Objetivo:** ter tudo pronto para começar a programar e um repositório no GitHub.

**O que fiz**
- Instalei o Visual Studio Code.
- Configurei o Git com meu nome e com o e-mail privado que o GitHub fornece, para meu e-mail pessoal não aparecer no histórico público.
- Defini `main` como nome da branch principal, igual ao padrão do GitHub, e o VS Code como editor do Git.
- Criei o repositório `erkvvz.com.br` no GitHub e fiz meu primeiro commit e meu primeiro envio.

**Problemas e soluções**
- A primeira versão da proposta tinha sido escrita em outro tom e foi para o histórico. Como o repositório tinha só dois commits e só eu o usava, juntei os dois em um e substituí o histórico do GitHub com `git push --force-with-lease`. Aprendi que reescrever histórico já enviado só é aceitável em situações assim, sem outras pessoas trabalhando no mesmo repositório.
- Corrigi a minha assinatura nos documentos: é **ERK.**, enquanto `erkvvz` é o meu nome de usuário.

**Comandos que passei a usar:** `git init`, `git status`, `git add`, `git commit`, `git remote add`, `git push`, `git diff`, `git commit --amend`, `git reset --soft`.

---

## Entrega 2: estrutura e primeiras páginas

**Objetivo:** criar a página inicial em HTML semântico, ainda sem estilo.

**O que fiz**
- Criei a página inicial e três páginas provisórias: Sobre, Projetos e Contato.
- Usei tags semânticas (`header`, `nav`, `main`, `section`, `footer`), `lang="pt-BR"`, título e descrição em cada página, e um atalho "Pular para o conteúdo" para quem navega pelo teclado.
- Instalei a extensão Live Preview para ver o site no computador com os links funcionando.
- Configurei o e-mail `contato@erkvvz.com.br` com o roteamento de e-mail da Cloudflare ([decisão 0005](decisoes/0005-email-de-contato.md)).

**Problemas e soluções**
- Os links internos começam com `/` (por exemplo, `/sobre/`). Abrindo o arquivo com dois cliques, eles quebram, porque o navegador entende a raiz como o disco do computador. A solução foi visualizar o site por um servidor local.
- Coloquei meu telefone e meu e-mail pessoal na página de contato e tirei antes do commit, por privacidade ([decisão 0007](decisoes/0007-dados-pessoais.md)).
- O e-mail de contato demorou a funcionar: primeiro um registro antigo bloqueava o recebimento, depois faltava a regra que liga `contato@` à minha caixa de entrada.

---

## Entrega 3: site no ar

**Objetivo:** publicar o site em `https://erkvvz.com.br`.

**O que fiz**
- Escolhi a Cloudflare Workers como hospedagem ([decisão 0003](decisoes/0003-hospedagem-cloudflare-workers.md)).
- Movi as páginas para a pasta `public/` e criei o `wrangler.jsonc` ([decisão 0004](decisoes/0004-pasta-public.md)).
- Liguei o repositório do GitHub à Cloudflare. A partir daí, cada envio para a `main` publica o site sozinho.
- Liguei o domínio `erkvvz.com.br`, redirecionei o `www` para o domínio principal e obriguei o uso de HTTPS ([decisão 0006](decisoes/0006-endereco-oficial.md)).

**Problemas e soluções**
- Ao conectar a Cloudflare ao GitHub, dei acesso a todos os repositórios. Corrigi para dar acesso só ao repositório do site.
- O `www` não pôde ser adicionado como domínio do projeto. Resolvi com um registro DNS e uma regra de redirecionamento, que é inclusive a forma mais adequada para ter um endereço único.
- O `http://` continuava abrindo sem HTTPS. Liguei a opção "Sempre usar HTTPS".
- O endereço provisório da Cloudflare (`*.workers.dev`) mostrava parte do e-mail da minha conta. Desativei esse endereço.

**Como confirmei que funcionou:** testei cada combinação de endereço (com e sem `www`, com `http` e `https`, cada página) e conferi que todas terminam em `https://erkvvz.com.br`, e que arquivos fora de `public/` não ficam acessíveis.

---

## Entrega 4: sistema de design

**Objetivo:** definir a base visual do site (cores, fontes, tamanhos e espaçamentos) antes de desenhar as páginas.

**O que fiz**
- Comparei três combinações de fontes e quatro opções de cor de destaque numa página de amostras, vendo cada uma aplicada aos textos do site.
- Escolhi Instrument Serif, Geist e Geist Mono, com preto, branco e vinho ([decisão 0008](decisoes/0008-sistema-de-design.md)).
- Criei três arquivos CSS em `public/assets/css/`:
  - `tokens.css`, com todos os valores visuais como variáveis;
  - `base.css`, com as regras gerais: fundo, textos, títulos, links, foco do teclado, seleção de texto e movimento reduzido;
  - `fontes.css`, que aponta para os arquivos das fontes.
- Baixei as fontes e suas licenças para o próprio site ([decisão 0009](decisoes/0009-fontes-no-proprio-site.md)) e pré-carreguei as duas usadas logo no início da página.
- O atalho "Pular para o conteúdo" agora fica escondido e só aparece ao apertar Tab.

**Problemas e soluções**
- O vinho escuro que eu queria tem pouco contraste sobre o preto. Medi o contraste de cada cor e criei dois tons: o vinho para áreas e elementos gráficos, e um vinho mais claro para o que precisa ser visto sobre o fundo.
- Enquanto as fontes não estavam no site, as páginas usavam as fontes reserva do sistema. Isso mostrou que a lista de fontes reserva em cada token funciona.

**Como confirmei que funcionou:** no navegador, os três arquivos CSS e as quatro fontes carregaram, o fundo e o texto ficaram com as cores certas, o título usa a Instrument Serif, o atalho de teclado aparece só com Tab e a página não vaza para os lados.

**Uma ideia para depois:** um objeto 3D girando na página inicial, a ser avaliado quando chegar a hora.

---

## Entrega 5: cabeçalho, menu e rodapé

**Objetivo:** criar a estrutura que se repete em todas as páginas, funcionando no celular, no computador e pelo teclado.

**O que fiz**
- Criei `public/assets/css/layout.css` com a estrutura da página: cabeçalho, conteúdo e rodapé, centralizados e com largura máxima. O rodapé fica sempre embaixo, mesmo em páginas curtas.
- **Cabeçalho:** a assinatura ERK., com o ponto em vinho, e o menu em letras monoespaçadas.
- **Menu:** sempre visível, sem botão de menu ([decisão 0010](decisoes/0010-menu-sempre-visivel.md)). A página atual aparece em branco, com o ponto vinho depois do nome, e é anunciada por leitores de tela com `aria-current="page"`.
- **Rodapé:** o e-mail de contato em destaque, as redes sociais e a assinatura, em duas colunas no computador e uma no celular.
- Nomeei as classes no padrão "bloco__elemento" (por exemplo, `.cabecalho__marca`), para saber pelo nome a qual parte da página cada regra pertence.

**Problemas e soluções**
- O ponto depois do item ativo do menu é só decoração. Usei um texto alternativo vazio no CSS (`content: "." / ""`) para que leitores de tela não leiam "ponto".
- Na tela de 320 pixels, a mais estreita que testei, o menu não cabe ao lado da assinatura e desce para a linha de baixo. Isso foi planejado com `flex-wrap`.

**Como confirmei que funcionou:** testei em 1280, 375 e 320 pixels de largura, sem nada vazando para os lados. As áreas de clique do menu e das redes têm pelo menos 36 pixels de altura. Navegando com Tab, o foco passa pelo atalho, pela assinatura e pelo menu, com o contorno vinho visível.

---

## Entrega 6: página inicial

**Objetivo:** dar à página inicial uma primeira impressão marcante, com a minha apresentação e um caminho para o resto do site.

**O que fiz**
- Escrevi a apresentação com as minhas palavras: "Um arquivo do que penso, o que sinto e o que crio."
- Montei a página em duas partes: o ERK. em tamanho grande, com o ponto vinho, e embaixo a frase em itálico à esquerda e o texto à direita, numa composição assimétrica. No celular, tudo vira uma coluna.
- Abaixo do meu nome, os papéis: compositor, programador e beatmaker.
- Criei a chamada "Explorar o arquivo", em vinho, que leva à nova página Arquivo.
- Mantive uma faixa "Agora", com o que estou fazendo no momento.
- Criei a página `/arquivo/`, um índice numerado de tudo o que está no site e do que ainda vai estar ([decisão 0011](decisoes/0011-pagina-arquivo.md)).

**Problemas e soluções**
- No celular, a linha dos papéis quebrava deixando um "·" sozinho no começo da linha de baixo. Usei um espaço que não quebra (`&nbsp;`) antes de cada ponto, para o separador ficar sempre junto da palavra anterior.
- A seta "↗" da chamada seria lida pelos leitores de tela como "seta para nordeste". Marquei a seta como decorativa (`aria-hidden="true"`).

**Como confirmei que funcionou:** testei a página inicial e o Arquivo em 1280 e 375 pixels, sem nada vazando para os lados. Cada página tem um único título principal (`h1`), e a chamada leva para `/arquivo/`.

---

## Ajustes depois da entrega 6

**O que mudei, depois de ver o site no ar**
- **Frase da página inicial:** em três linhas, ela parecia uma coluna estreita. Aumentei a largura dela, e no computador agora são duas linhas, quebrando na vírgula.
- **Cor de destaque:** troquei o vinho por um roxo berinjela, usado só em detalhes: pontos, sublinhados, a seta da chamada e a bolinha do "Disponível" ([decisão 0012](decisoes/0012-destaque-roxo.md)).
- Antes de escolher, comparei três vermelhos mais escuros e quatro roxos em páginas de amostra, aplicados nos mesmos elementos do site.

**Problemas e soluções**
- Nem o vermelho escuro nem o roxo escuro podem ser cor de texto sobre o preto: ficariam ilegíveis. A solução foi manter todo o texto em branco ou cinza e usar a cor só como detalhe. O contorno de foco do teclado passou a ser branco.
- Em tamanhos pequenos, o roxo berinjela quase sumia, como no ponto do ERK. no cabeçalho. Criei um segundo tom, mais claro, para os detalhes pequenos, e mantive o berinjela no ERK. grande da página inicial.
- Testei deixar os rótulos em roxo, mas por enquanto mantive em cinza.

---

## Troca da cor de destaque

Troquei o roxo por um **vinho profundo**, `#702638`, com um tom mais claro do mesmo vinho, `#C05A72`, para os detalhes pequenos ([decisão 0013](decisoes/0013-destaque-vinho-profundo.md)). As regras de uso continuaram as mesmas. Como as cores ficam em dois tokens, a troca foi mudar duas linhas do `tokens.css`.

---

## Entrega 6.1: a escultura "No ties" na página inicial

**Objetivo:** levar a escultura 3D do laboratório para a página inicial sem perder velocidade, sem prejudicar o celular e com uma versão que funciona sem o 3D.

**O que fiz**
- Trouxe o Three.js para o site, sem npm, com um *import map* ([decisão 0014](decisoes/0014-threejs.md)).
- Criei uma versão da escultura só com o que o site precisa, com os valores que escolhi no laboratório: o nó respira sozinho, se solta quando rolo a página para baixo e se fecha quando rolo para cima.
- Gerei uma imagem estática da escultura a partir dela mesma, para aparecer antes do 3D e no lugar dele quando ele não carregar.
- Escrevi o `inicio.js`, que decide se o 3D deve carregar: só depois da página pronta, e nunca com "reduzir movimento", economia de dados ou sem WebGL 2 ([decisão 0015](decisoes/0015-escultura-na-pagina-inicial.md)).
- Mantive a composição editorial no computador (frase à esquerda, texto à direita), com a escultura grande por trás do lado direito e uma sombra escura atrás do texto. Escolhi essa entre quatro composições que comparei lado a lado.

**Problemas e soluções**
- Na primeira composição, a escultura ficava por trás dos parágrafos e atrapalhava a leitura. Testei mover o texto para a esquerda, mas isso tirava o ar editorial. A solução foi uma sombra suave atrás do texto, que apaga a escultura só ali.
- A escultura criava rolagem para os lados. A unidade `vw` inclui a barra de rolagem; troquei por `cqw`, medida a partir da largura real do conteúdo.
- Na troca da imagem pelo 3D, havia um instante com as duas meio transparentes e em poses diferentes. Fiz o 3D começar exatamente na pose da imagem e aparecer por cima dela antes de a imagem sair.
- Ao gerar a imagem, a primeira tentativa saiu vazia: o quadro já tinha sido apagado quando tentei salvá-lo. A solução foi capturar no instante em que ele é desenhado.

**Como confirmei que funcionou:** testei em 1440 e 375 pixels, sem rolagem para os lados; conferi a imagem sozinha e o 3D por cima dela; e medi o peso: cerca de 147 KB na primeira visita sem o 3D e, medido no ar, cerca de 320 KB com ele (a estimativa local era 287 KB; a compressão real da Cloudflare foi menor que a calculada).

---

## Ajuste depois da entrega 6.1: a travada no celular

Testando no meu celular, a página dava uma travada quando a escultura entrava. A causa: toda a preparação do 3D acontecia de uma vez só (gerar a forma, a sala de reflexo e compilar o shader na placa de vídeo), e isso ocupava o navegador por um instante, inclusive enquanto eu rolava a página.

**O que mudei:** a montagem agora é feita em etapas, com uma pausa entre elas para o navegador continuar respondendo. As etapas pesadas esperam a página ficar parada, sem rolagem, e o shader é compilado antes do primeiro quadro com `compileAsync`, que usa a compilação em paralelo da placa de vídeo quando o navegador oferece.

**Como confirmei:** no computador, a escultura continua aparecendo normalmente, sem erros. A confirmação de verdade é no celular, depois de publicar.

**Segunda rodada.** No meu iPhone, ainda havia uma travada. O motivo: o Safari do iPhone não compila shaders em paralelo, então preparar o material metálico completo e a sala de reflexo continuava segurando a página. A solução foi dar ao celular um caminho mais leve: um material *matcap*, que usa uma imagem pronta de uma esfera do mesmo metal (8 KB) em vez de calcular os reflexos. Também fiz o site esperar a rolagem parar antes de baixar o Three.js. No computador, nada mudou.

**Terceira rodada.** Ficou só uma travadinha de menos de 1 segundo ao abrir no celular: é o tempo que o iPhone leva para ler o código do Three.js, e essa parte não dá para dividir. Em vez de tentar eliminá-la, mudei o momento em que ela acontece: no celular, o 3D só começa depois de 2 segundos sem nenhum toque na tela. A travadinha acontece enquanto a pessoa lê, com nada se mexendo, e não é percebida. No computador, a espera é de 0,4 segundo.

**Revertido.** Testando no celular e no computador, a espera de 2 segundos deixou a experiência pior. Voltei o `inicio.js` para a versão anterior (material leve no celular e espera só a rolagem parar). A travadinha de menos de 1 segundo ao abrir no celular continua, e fica como ponto de melhoria para o futuro.

---

## Ajuste depois da entrega 6.1: a escultura no computador

Gravei a tela do computador e encontrei três problemas:

1. **Imagem dupla ao abrir.** O 3D já começava seguindo a posição do mouse, então ficava numa pose diferente da imagem estática durante a troca. Agora o primeiro quadro do 3D é exatamente a pose da imagem; o mouse passa a influenciar só depois, aos poucos, em 1,5 segundo. A troca também ficou mais curta (0,6 s).
2. **Um "pulo" do nó logo depois de aparecer.** Um salto grande de rolagem (como o navegador voltando para onde a página estava) empurrava o nó de uma vez. Agora o efeito da rolagem em cada quadro tem um limite, e a rolagem só conta depois que o 3D apareceu.
3. **O fio solto sumia.** Quando o nó se soltava, o fio ficava quase todo atrás da sombra do texto e cortado pela borda da tela. Subi a escultura, para o centro dela ficar acima da coluna de texto, e diminuí o corte na borda.

**Como confirmei:** comparei o primeiro quadro do 3D com a imagem estática, com o mouse no canto da tela, e a diferença ficou abaixo de 1 numa escala de 0 a 255. Também conferi a escultura fechada e solta na nova posição.

**Velocidade mais calma.** Baixei a velocidade da escultura de 1.1 para 0.6. Ela fica mais perto de uma peça numa galeria do que de uma animação, e qualquer engasgo fica menos perceptível, porque o nó mal sai do lugar. O nó agora leva cerca de 30 segundos para se soltar e se fechar. Como a pose de partida depende da velocidade, gerei a imagem estática de novo.

---

## A escultura acorda quando o visitante está presente

Comparei no laboratório duas versões novas contra a que estava no ar: uma mais lenta e uma que acorda quando o visitante interage. Escolhi a segunda ([decisão 0016](decisoes/0016-escultura-acorda.md)).

**Como ficou:** a escultura começa quase parada e com 35% do brilho. Ao rolar, tocar, mexer o mouse ou apertar uma tecla, ela acorda: ganha brilho e se mexe, mais devagar que antes (velocidade 0.6). Depois de 6 segundos sem interação, ela se acalma de novo. Calma, ela é desenhada com menos frequência, para economizar bateria.

**Como confirmei:** no computador, o brilho foi de 35% (parada) para 95% depois de rolar, e voltou para 40% cerca de 10 segundos depois. No celular, foi para 98% ao tocar. A troca da imagem pelo 3D ficou instantânea, porque os dois começam iguais e com o mesmo brilho.
