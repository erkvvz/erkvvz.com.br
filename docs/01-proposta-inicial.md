# ERK. — Proposta inicial

> Documento de planejamento, escrito em novembro de 2026, antes da primeira linha de código do site.
> Algumas decisões ainda estão em aberto. Conforme eu for decidindo, registro aqui e em `docs/decisoes/`.

---

## 1. A identidade ERK.

ERK. é a minha assinatura.

A assinatura aparece na capa, nas capas dos beats, nas fotos. Meu nome aparece na apresentação, no contato e nos perfis profissionais.

O ponto final faz parte do nome. Ele dá a sensação de algo afirmado e assinado, e quero que ele vire um elemento visual recorrente no site.

## 2. O que é este site

Não é só um portfólio de programador com uma aba de hobbies. É a minha apresentação pessoal na internet, um arquivo vivo que reúne quatro coisas que fazem parte de mim:

| Área | Onde fica no site | O que mostra |
|---|---|---|
| Código | Projetos e conhecimentos | O que construo e o que estou aprendendo |
| Som | Música | O que produzo e o que escuto |
| Imagem | Fotografia | Como vejo as coisas e como me apresento |
| Palavra | Journal e Sobre | Como penso e como estou evoluindo |

Quero que três tipos de visitante saiam daqui satisfeitos:

1. **Quem está recrutando:** encontra rápido o que estudo, meus projetos, meu GitHub e como falar comigo.
2. **Quem faz música:** encontra meus beats, consegue ouvir e sabe como propor uma parceria.
3. **Quem só está curioso:** explora com calma e sai sabendo quem eu sou.

Este site também é o meu **primeiro projeto**. Por isso ele mesmo vai ser o projeto 001 na seção de Projetos, com a história de como foi construído, as decisões e o que aprendi.

Uma regra que vale para tudo: **nada inventado.** Prefiro poucos projetos bem documentados a uma página cheia de conteúdo artificial. O site cresce junto comigo.

## 3. Mapa do site

```
/                  Início
/sobre/            Quem sou, minha trajetória e o que estou estudando
/projetos/         Meus projetos
/projetos/<nome>/  Página de cada projeto
/musica/           Beats, músicas, letras e playlist
/fotografia/       Galeria
/journal/          Textos e registros
/journal/<texto>/  Cada texto
/contato/          Contato e redes
```

O site é todo em português. Os endereços também.

Algumas decisões de organização:

- **Meus conhecimentos técnicos ficam dentro de "Sobre"** por enquanto. A lista ainda é curta e quero apresentá-la com honestidade, indicando o que estou aprendendo. Quando crescer, vira uma página própria.
- **O menu principal terá no máximo cinco itens.** O contato fica no rodapé de todas as páginas.
- **As redes sociais ficam reunidas** no rodapé e na página de contato, em vez de ícones espalhados.
- **Uma seção só entra no menu quando tiver conteúdo real.** A primeira versão publicada terá Início, Sobre, Projetos e Contato. Música, Fotografia e Journal entram quando eu tiver material para elas.

## 4. Como vou construir

### Primeira etapa: HTML, CSS e JavaScript puros

Quero entender os fundamentos antes de adicionar qualquer ferramenta. Então começo assim:

- **Um arquivo HTML por página**, cada um na sua pasta (`sobre/index.html`). Isso gera endereços limpos, como `erkvvz.com.br/sobre/`, em qualquer hospedagem.
- **Sem frameworks e sem etapa de build.** Abro o arquivo no navegador e vejo o resultado.
- **CSS organizado em camadas:** variáveis de design (cores, fontes e espaçamentos), estilos base e componentes.
- **JavaScript só onde existe comportamento:** menu no celular, galeria e player.

### O desafio da música entre páginas

Quero que o visitante possa ouvir música enquanto navega. O problema é que, num site com várias páginas HTML, cada clique recarrega a página inteira e o áudio para.

As saídas que estou avaliando:

| Opção | Como funciona | Troca |
|---|---|---|
| Player só na página de Música | A música toca apenas lá | Simples, mas perde a ideia de ouvir navegando |
| Navegação própria em JavaScript | O JS troca só o conteúdo da página, sem recarregar | Ótimo para aprender, mas exige cuidado com SEO, acessibilidade e o botão voltar |
| Astro | Gera HTML estático e mantém um elemento vivo entre páginas | Adiciona npm e uma etapa de build |

O plano atual é começar com HTML puro e avaliar a migração para o **Astro** quando chegar a hora de construir o player. Assim uma ferramenta nova só entra quando resolver um problema que eu já enfrentei.

### E Java, Spring Boot e MySQL?

Fazem parte da minha trilha de estudos, mas este site não precisa de servidor nem de banco de dados para funcionar. Prefiro usá-los em projetos próprios, que depois vão aparecer na seção de Projetos.

### Hospedagem e domínio

- O domínio `erkvvz.com.br` está registrado no Registro.br, com o DNS gerenciado pela Cloudflare.
- A hospedagem é a **Cloudflare Workers**, com arquivos estáticos. É gratuita para este uso, tem HTTPS automático e publica o site sozinha a cada envio para o GitHub. Eu tinha planejado usar a Cloudflare Pages, mas a própria Cloudflare passou a recomendar o Workers para projetos novos.
- O endereço `contato@erkvvz.com.br` recebe e-mails pelo roteamento de e-mail da Cloudflare, que é gratuito e encaminha as mensagens para a minha caixa de entrada.

## 5. Direção visual

Minimalista, editorial e escura, como uma publicação digital ou um estúdio criativo pessoal.

- **Escuro, mas não preto puro.** Fundo grafite quase preto, texto em branco quebrado e uma escala de cinzas.
- **Tipografia forte.** Quando não houver imagem, a tipografia é a imagem.
- **Três fontes, cada uma com um papel:** uma de destaque para títulos e para o ERK., uma confortável para leitura, e uma monoespaçada para detalhes como datas, tecnologias e BPM.
- **Pouca ou nenhuma cor.** Se houver uma cor de destaque, ela aparece em raros momentos.
- **O ponto como assinatura.** O `.` de ERK. pode marcar a seção ativa, indicar carregamento e pulsar quando uma música estiver tocando.
- **Catálogo numerado.** Projetos, beats e textos recebem números, como um selo de discos: `001`, `B-001`, `J-001`.
- **Cada área tem o seu ritmo,** dentro do mesmo sistema: projetos em grade, música como tracklist, fotos em destaque e textos numa coluna de leitura confortável.
- **Movimento discreto,** respeitando quem pede para reduzir animações no sistema.

O que eu não quero: excesso de cor, gradientes aleatórios, efeitos sem propósito, cards repetidos para tudo e cara de landing page comercial.

## 6. Música no site

A música é parte de quem eu sou, então não vai ser um detalhe. O plano tem três etapas:

1. **Playlist do Spotify incorporada** na página de Música.
2. **Mini player que continua tocando** enquanto o visitante navega, com o visual do ERK.
3. **Player próprio para os meus beats,** tocando a faixa completa para qualquer pessoa, sem precisar de login.

Limitações que estou considerando:

- O player incorporado do Spotify só toca a faixa inteira para quem está logado no Spotify. Os demais ouvem uma prévia de 30 segundos.
- Os navegadores bloqueiam áudio que começa sozinho, e eu concordo com eles: **a música só toca quando o visitante escolher.**
- Não vou usar nenhuma forma não autorizada de reproduzir músicas.

## 7. Organização do repositório

```
erkvvz.com.br/
├── public/           Tudo que vai para o ar, e só isso
│   ├── index.html
│   ├── sobre/index.html
│   ├── projetos/index.html
│   ├── contato/index.html
│   ├── 404.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── fonts/
│   │   └── img/
│   ├── robots.txt
│   └── sitemap.xml
├── docs/
│   └── decisoes/     Uma nota curta para cada decisão técnica
├── wrangler.jsonc    Configuração do site na Cloudflare
├── README.md
└── .gitignore
```

A regra é simples: o que está em `public/` é publicado, o resto não. Assim a documentação e os arquivos de configuração nunca vão parar no site por engano.

Arquivos brutos, como fotos originais e projetos de beats, ficam fora do repositório. Só entra o que vai para o site, já otimizado.

## 8. Roadmap

Cada entrega termina com algo que dá para ver e testar, e com um commit.

| # | Entrega | Status |
|---|---|---|
| 1 | Ambiente: VS Code, Git e repositório no GitHub | Concluída |
| 2 | Estrutura de pastas e página inicial em HTML semântico, sem estilo | Concluída |
| 3 | Site no ar em `erkvvz.com.br` com HTTPS | |
| 4 | Sistema de design: cores, fontes e espaçamentos | |
| 5 | Cabeçalho, menu e rodapé responsivos e navegáveis pelo teclado | |
| 6 | Página inicial, primeira versão | |
| 7 | Sobre, com meus conhecimentos técnicos | |
| 8 | Projetos, com este site como projeto 001 | |
| 9 | Contato, SEO, prévia de compartilhamento, favicon e página 404 | |
| 10 | Música, com a playlist incorporada | |
| 11 | Player que continua tocando entre páginas | |
| 12+ | Fotografia, Journal, player dos beats, acessibilidade e performance | |

Coloco o site no ar cedo, na entrega 3, para aprender deploy, DNS e HTTPS enquanto o projeto ainda é pequeno.

## 9. O que ainda estou decidindo

- As fontes e se haverá uma cor de destaque.
- A frase de apresentação da página inicial.
- Como organizar a seção de fotografia.
- Como apresentar os beats que já tenho.
- A playlist do Spotify que vai representar o site.
