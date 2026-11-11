# 0011. Página Arquivo: um índice de tudo, inclusive do que ainda não existe

- **Data:** novembro de 2026
- **Status:** Aceita

## Contexto

Na página inicial, apresento o ERK. como "um arquivo do que penso, o que sinto e o que crio". Eu queria uma chamada, "Explorar o arquivo", que levasse a um lugar com tudo o que está no site.

Ao mesmo tempo, muitas áreas ainda não têm conteúdo, e eu não quero inventar nada para preencher.

## Decisão

Criei a página `/arquivo/`, um índice numerado como um catálogo. Cada item tem número, nome, descrição e um estado:

- **Disponível:** já tem conteúdo.
- **Em construção:** a página existe, mas ainda está sendo feita.
- **Em breve:** ainda não existe e não tem link.

O menu principal continua só com as páginas que existem. O Arquivo é o lugar onde as possibilidades também aparecem.

## Por quê

- Combina com a frase da página inicial: "Algumas coisas estão prontas. Outras ainda são possibilidades."
- Mostra para onde o site vai, sem fingir que o conteúdo já existe.
- A numeração (`001`, `002`...) reforça a ideia de arquivo e de catálogo.

## Consequências

- Quando uma área ganhar conteúdo, o estado dela muda no Arquivo e ela pode entrar no menu.
- Itens "em breve" não têm link, para ninguém cair numa página vazia.
