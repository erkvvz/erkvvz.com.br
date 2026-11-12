# 0017. Identidade nova: a minha tag, a escultura "Sorrisos", Inter e o fundo de grão

- **Data:** novembro de 2026
- **Status:** Aceita. Substitui a forma da escultura da [decisão 0015](0015-escultura-na-pagina-inicial.md) (o carregamento progressivo continua) e as fontes da [decisão 0008](0008-sistema-de-design.md). A [decisão 0016](0016-escultura-acorda.md) continua valendo.

## Contexto

A fonte dos títulos (Instrument Serif) era o que mais me incomodava no site. Juntei referências do que eu gosto: cultura hip hop e rap, pixação e graffiti, a ideia de dualidade (yin yang, as duas faces), um yin yang pintado com dois sorrisos de dentes de ouro. Testei no laboratório várias esculturas, fontes, fundos e cores, todas combinadas ao vivo na página inicial, e escrevi a minha tag algumas vezes numa folha para ela ser vetorizada.

## Decisão

1. **"ERK." sozinho é sempre a minha tag.** O ERK. grande da página inicial é a tag em versão cromada; no topo e no rodapé de todas as páginas, a tag aparece em traço de caneta. Quando "ERK." está dentro de uma frase, continua sendo texto.
2. **A escultura passa a ser a "Sorrisos":** um yin yang de metal, com uma metade prata e outra vinho, e um sorriso vermelho de dentes de ouro em cada metade. As metades se afastam e se encaixam, respirando, e reagem à rolagem e ao mouse. Velocidade 1.8.
3. **Inter + JetBrains Mono** no lugar de Instrument Serif, Geist e Geist Mono. A Inter vale para textos e títulos; a JetBrains Mono, para rótulos e metadados.
4. **Fundo de grão em todas as páginas:** um granulado fino de filme e os cantos levemente escurecidos.
5. **A frase "Um arquivo do que penso, o que sinto e o que crio." sai da página inicial.** Fica só o ERK., e o texto de apresentação sobe para a mesma altura dele, por cima da escultura.
6. **Sombra em cada letra no lugar da sombra em elipse** atrás do texto, que aparecia como uma mancha sobre a escultura e o fundo.

## Por quê

- **A tag é minha:** nenhuma fonte representa a minha assinatura melhor do que a minha própria letra. Ela também liga o site à pixação e ao graffiti.
- **A Sorrisos junta várias coisas que eu sou:** a dualidade, o rap (os dentes de ouro) e a cor vinho que já era do site.
- **Inter e JetBrains Mono** são fontes claras e modernas, que deixam a tag ser a única peça "desenhada" da página.
- **O grão** dá textura ao preto sem pesar: é só CSS, parado.

## Consequências

- A tag é uma imagem SVG (`tag-erk.svg` e `tag-erk-cromado.svg`), gerada a partir dos mesmos traços usados no laboratório. Para leitores de tela e para o Google, o texto alternativo continua sendo "ERK.".
- A imagem estática da escultura foi gerada de novo a partir do primeiro quadro do 3D (`escultura-sorrisos.webp`, 23 KB).
- O código da escultura ficou mais simples: ela é feita de peças (metades, pontos, sorrisos) que se movem, e não precisa mais de um shader próprio.
- As fontes antigas saíram do site. As novas estão em `/assets/fontes/`, com as licenças.
- No celular, a escultura continua com o material leve (matcap), tingido com a cor de cada peça.
