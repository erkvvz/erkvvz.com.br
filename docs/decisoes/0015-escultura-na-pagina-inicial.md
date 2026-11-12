# 0015. A escultura "No ties" na página inicial, com carregamento progressivo

- **Data:** novembro de 2026
- **Status:** Aceita

## Contexto

Quero que o site seja também um estúdio artístico experimental, com uma peça 3D central. Ao mesmo tempo, defini três condições: o site precisa carregar rápido, funcionar bem no celular e continuar completo mesmo se o 3D não carregar.

A escultura nasceu do meu antigo nome artístico, **No ties** ("sem amarras"): um nó de metal que se desata. Ela foi desenvolvida e testada antes num laboratório separado do site.

## Decisão

A escultura entra na página inicial em camadas:

1. **Imagem estática primeiro.** A página chega com uma imagem da escultura (`escultura-no-ties.webp`, 45 KB), tirada da própria escultura 3D. É o que todo mundo vê de início.
2. **O 3D só depois.** Quando a página termina de carregar e o navegador fica livre, um script (`inicio.js`) decide se o 3D deve entrar.
3. **O 3D não entra** quando a pessoa pediu menos movimento no sistema, quando ativou economia de dados, ou quando o navegador não tem WebGL 2. Nesses casos, a imagem fica.
4. **A troca é invisível.** O 3D começa exatamente na pose da imagem e aparece por cima dela com um fade. Só depois a imagem sai.

**Comportamento:** o nó respira sozinho (se solta e se fecha devagar). Rolando a página para baixo ele se solta; para cima, se fecha. Ele também inclina e muda a luz conforme o mouse.

**Composição:** no computador, mantive a composição editorial: o ERK. na largura toda e, embaixo, a frase à esquerda e o texto à direita. A escultura fica grande, por trás do lado direito e cortada pela borda da tela, e uma sombra escura e suave atrás da coluna de texto garante a leitura. Antes de decidir, comparei quatro composições (texto todo à esquerda; o ERK. cruzando a escultura; a sombra atrás do texto; a escultura bem apagada). No celular, a escultura fica atrás do topo da página, um pouco apagada.

## Por quê

- Quem chega vê a página completa imediatamente, sem esperar o 3D.
- O 3D é um enriquecimento, não uma dependência. Se falhar, nada quebra.
- Acessibilidade e economia de dados vêm antes do efeito.

## Consequências

- **Peso:** a primeira visita, sem o 3D, transfere cerca de 147 KB. Com o 3D, cerca de 320 KB medidos no ar (8 KB a mais no celular, pelo matcap): a Cloudflare comprime o Three.js para 172 KB, um pouco menos do que eu tinha estimado (135 KB). Fica um pouco acima da meta de 300 KB, mas essa parte só é baixada depois que a página já está pronta.
- O desenho pausa quando a escultura sai da tela ou a aba fica em segundo plano.
- A montagem é feita em etapas, com pausas entre elas, e as partes pesadas esperam a rolagem parar. No primeiro teste no meu celular, a página dava uma travada quando o 3D entrava, porque tudo era preparado de uma vez.
- No celular, a escultura usa menos detalhe, uma resolução menor e um material mais leve: em vez de calcular os reflexos a cada quadro, ela usa um *matcap*, uma imagem de 8 KB de uma esfera do mesmo metal, gerada a partir da própria escultura. O visual fica muito parecido, e o celular não precisa preparar o shader pesado nem a sala de reflexo.
- A escultura é decorativa (`aria-hidden="true"`): leitores de tela a ignoram.
- Se os valores da escultura mudarem no laboratório, a imagem estática precisa ser gerada de novo.
