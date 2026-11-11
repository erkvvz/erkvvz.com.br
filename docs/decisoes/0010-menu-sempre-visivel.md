# 0010. Menu sempre visível, sem botão de menu

- **Data:** novembro de 2026
- **Status:** Aceita

## Contexto

Muitos sites escondem o menu no celular atrás de um botão com três linhas (o "hambúrguer"). Esse botão precisa de JavaScript para abrir e fechar, e de cuidados extras de acessibilidade: avisar leitores de tela se o menu está aberto, controlar o foco do teclado e fechar com a tecla Esc.

O menu do site tem três itens: Sobre, Projetos e Contato.

## Decisão

O menu fica sempre visível, em todas as larguras de tela. Em telas muito estreitas, ele desce para a linha de baixo da assinatura ERK.

## Por quê

- Três itens cabem na tela de um celular comum, de 375 pixels de largura, na mesma linha da assinatura.
- O visitante vê as seções logo de cara, sem precisar descobrir que existe um menu escondido.
- Não precisa de JavaScript, então não tem o que quebrar.

## Consequências

- A página atual é marcada com `aria-current="page"`, que leitores de tela anunciam, e aparece em branco com o ponto vinho do ERK. depois do nome.
- O menu pode crescer até cinco itens. Se não couber mais, a decisão será revista.
