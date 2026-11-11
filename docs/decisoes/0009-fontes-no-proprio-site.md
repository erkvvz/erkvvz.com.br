# 0009. Fontes hospedadas no próprio site

- **Data:** novembro de 2026
- **Status:** Aceita

## Contexto

As fontes escolhidas estão no Google Fonts. Existem duas formas de usá-las: carregar direto dos servidores do Google ou baixar os arquivos e hospedá-los junto com o site.

## Decisão

Os arquivos das fontes ficam no próprio site, em `public/assets/fontes/`, no formato WOFF2, apenas com o conjunto de caracteres latino, que cobre o português.

## Por quê

- **Privacidade:** carregando do Google, cada visita envia o endereço IP do visitante para o Google. Hospedando aqui, nenhum dado sai para terceiros.
- **Independência:** o site não depende de outro serviço para aparecer do jeito certo.
- **Desempenho:** sem conexão extra com outro servidor. As duas fontes usadas logo no início da página são pré-carregadas (`preload`).
- **Tamanho:** os quatro arquivos somam cerca de 95 KB.

## Consequências

- As três fontes usam a licença SIL Open Font License, que permite a redistribuição desde que o texto da licença acompanhe os arquivos. As licenças ficam em `public/assets/fontes/licencas/`.
- Se uma fonte ganhar uma versão nova, a atualização é manual.
