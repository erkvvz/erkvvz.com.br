# 0001. Começar com HTML, CSS e JavaScript puros

- **Data:** novembro de 2026
- **Status:** Aceita. A primeira biblioteca externa, o Three.js, entrou sem npm nem build ([decisão 0014](0014-threejs.md)).

## Contexto

Este é o meu primeiro projeto de programação. Existem muitas ferramentas para criar sites, como React, Astro e Next.js, mas cada uma traz conceitos próprios, dependências e uma etapa de build.

## Decisão

Começo o site com HTML, CSS e JavaScript puros: um arquivo HTML por página, sem frameworks, sem npm e sem build.

## Por quê

- Quero entender os fundamentos antes de qualquer ferramenta que os esconda.
- Cada linha do projeto precisa ter um motivo que eu consiga explicar.
- Sem build, o que está no repositório é exatamente o que vai para o ar.

## Consequências

- Partes repetidas, como o cabeçalho e o rodapé, precisam ser copiadas em cada página. Isso é aceitável enquanto o site é pequeno.
- Um player de música que continua tocando entre páginas não é possível com páginas HTML separadas. Quando eu chegar nessa parte, vou avaliar o Astro, e a mudança vai ganhar uma nota própria.
