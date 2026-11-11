# 0012. Cor de destaque: roxo berinjela, só nos detalhes

- **Data:** novembro de 2026
- **Status:** Aceita. Substitui a parte de cores de destaque da [decisão 0008](0008-sistema-de-design.md).

## Contexto

Com o site no ar, o vinho escolhido na decisão 0008 me pareceu claro e rosado demais. Comparei três vermelhos mais escuros e quatro roxos, aplicados nos mesmos elementos do site.

## Decisão

A cor de destaque passa a ser um roxo berinjela, `#4A1466`, usado de forma minimalista:

- no ponto do ERK. e no ponto depois do item atual do menu;
- no sublinhado e na seta da chamada "Explorar o arquivo";
- no sublinhado dos links ao passar o mouse;
- na bolinha antes do estado "Disponível" no Arquivo.

Ele **não** aparece como fundo de blocos, nem como cor de texto.

## Por quê

- Um tom escuro e fechado combina mais com a estética que eu quero.
- Usado só em detalhes, ele aparece como assinatura, sem competir com o texto.

## Consequências

- O roxo é escuro demais para ser lido como texto sobre o preto, então todo texto continua em branco ou cinza.
- O contorno de foco do teclado passou a ser branco, para ficar visível para qualquer pessoa.
- A seleção de texto passou a ter as cores invertidas (fundo branco e texto preto), sem cor de destaque.
- Os tokens `--cor-vinho` e `--cor-vinho-vivo` foram substituídos por `--cor-destaque`.

## Ajuste: um segundo tom para os detalhes pequenos

Em tamanhos pequenos, como o ponto do ERK. no cabeçalho, o berinjela ficava quase invisível. Criei um roxo mais claro, `--cor-destaque-claro: #9B5FD0`, da mesma família:

- **Berinjela** (`#4A1466`): só onde o destaque é grande, como o ponto do ERK. na página inicial.
- **Roxo claro** (`#9B5FD0`): nos detalhes pequenos, como os pontos do cabeçalho, do rodapé e do menu, a seta e os sublinhados, e a bolinha do "Disponível".

Também testei deixar os rótulos (menu, papéis, "Redes", estados do Arquivo) em roxo. Por enquanto, preferi mantê-los em cinza. Como a cor está num único token, trocá-la no futuro é mudar uma linha.
