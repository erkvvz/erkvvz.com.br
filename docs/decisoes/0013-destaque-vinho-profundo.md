# 0013. Cor de destaque: vinho profundo

- **Data:** novembro de 2026
- **Status:** Aceita. Substitui as cores da [decisão 0012](0012-destaque-roxo.md).

## Contexto

Depois de usar o roxo por um tempo, decidi testar outra cor de destaque. Escolhi um vinho profundo, `#702638`, mais fechado e escuro que o vinho da primeira versão.

## Decisão

As regras de uso da decisão 0012 continuam valendo. Só as cores mudam:

| Token | Antes (roxo) | Agora (vinho profundo) | Uso |
|---|---|---|---|
| `--cor-destaque` | `#4A1466` | `#702638` | detalhes grandes: o ponto do ERK. na página inicial |
| `--cor-destaque-claro` | `#9B5FD0` | `#C05A72` | detalhes pequenos: pontos, setas, sublinhados, a bolinha do "Disponível" |

O tom claro é o mesmo vinho, só mais luminoso, para não sumir sobre o preto nos detalhes pequenos.

## Por quê

- O vinho profundo combina com a estética escura e editorial do site.
- Como a cor está em dois tokens, a troca foi mudar dois valores, sem mexer no resto do CSS.

## Consequências

- O vinho profundo continua escuro demais para ser cor de texto sobre o preto (contraste de 1.9). Todo texto segue em branco ou cinza.
- O tom claro tem contraste de 4.6 sobre o preto, igual ao do roxo claro anterior.
