# 0008. Sistema de design: cores, fontes e tokens

- **Data:** novembro de 2026
- **Status:** Aceita. A parte das cores de destaque (vinho) foi substituída pela [decisão 0012](0012-destaque-roxo.md).

## Contexto

Antes de desenhar as páginas, eu precisava definir a base visual do site: cores, fontes, tamanhos e espaçamentos. Sem essa base, cada página acabaria com valores diferentes.

A direção que escolhi é **editorial, minimalista e artística**: preto como base, branco para a tipografia e um vinho como destaque, usado pontualmente.

## Decisão

### Fontes

| Papel | Fonte |
|---|---|
| Títulos e identidade | Instrument Serif |
| Textos e interface | Geist |
| Informações técnicas e detalhes | Geist Mono |

Comparei três combinações lado a lado. Uma grotesca larga dava uma aparência mais tecnológica e corporativa. A Instrument Serif dá mais personalidade ao ERK. e aproxima o site de um estúdio criativo.

### Cores

| Token | Cor | Uso |
|---|---|---|
| `--cor-fundo` | `#0B0B0B` | base do site |
| `--cor-superficie` | `#141414` | áreas elevadas |
| `--cor-borda` | `#2B2B2B` | linhas e divisões |
| `--cor-texto` | `#EDEDE9` | texto principal |
| `--cor-texto-suave` | `#A8A8A4` | textos secundários |
| `--cor-texto-fraco` | `#83837D` | datas e metadados |
| `--cor-vinho` | `#8C2236` | elementos gráficos e áreas de destaque |
| `--cor-vinho-vivo` | `#CC5A6C` | foco do teclado, hover e detalhes sobre o preto |

### Tokens

Todos os valores visuais ficam em `public/assets/css/tokens.css`, como variáveis CSS: cores, fontes, tamanhos de texto, espaçamentos, larguras e tempos de animação.

## Por quê

- **Um lugar só para cada valor:** mudar uma cor ou um espaçamento no site inteiro é mudar uma linha.
- **Contraste medido:** todas as cores usadas em texto passam do mínimo de 4.5:1 recomendado pelas diretrizes de acessibilidade (WCAG).
- **Dois tons de vinho:** um vinho escuro tem pouco contraste sobre o preto (2.3:1). Ele fica para áreas e elementos gráficos, e uma versão mais clara é usada onde precisa ser vista sobre o fundo, como o contorno de foco.
- **Preto quase puro:** `#0B0B0B` é visualmente preto, mas um pouco mais confortável para leitura do que `#000`.

## Consequências

- Valores visuais não devem ser escritos soltos no CSS: sempre por meio de um token.
- Se o vinho vivo precisar mudar de tom, o contraste precisa ser medido de novo.
