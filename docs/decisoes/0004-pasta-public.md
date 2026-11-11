# 0004. Arquivos do site na pasta `public/`

- **Data:** novembro de 2026
- **Status:** Aceita

## Contexto

A Cloudflare Workers publica uma pasta inteira. No começo, as páginas estavam na raiz do repositório, junto com o README, a documentação e os arquivos de configuração. Publicar a raiz deixaria esses arquivos acessíveis no site.

## Decisão

Tudo que vai para o ar fica dentro de `public/`. O resto do repositório (documentação, configuração) fica fora.

## Por quê

- A regra é simples de lembrar: o que está em `public/` é publicado, o resto não.
- Um arquivo novo fora de `public/` nunca vai para o ar por esquecimento.
- É a mesma convenção usada por várias ferramentas, como o Astro, o que facilita uma migração futura.

## Alternativa considerada

Manter as páginas na raiz e usar um arquivo `.assetsignore` com a lista do que não publicar. Descartei porque cada arquivo novo precisaria ser lembrado na lista.

## Consequências

- Para visualizar o site no computador com os links funcionando, o servidor local precisa usar `public/` como raiz. Isso está configurado em `.vscode/settings.json`.
- As páginas foram movidas com `git mv`, que mantém o histórico de cada arquivo.
