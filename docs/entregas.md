# Diário de entregas

Registro do que fiz em cada entrega do projeto, dos problemas que apareceram e de como resolvi. O planejamento completo está em [`01-proposta-inicial.md`](01-proposta-inicial.md) e as decisões técnicas em [`decisoes/`](decisoes/).

---

## Entrega 1: ambiente de desenvolvimento

**Objetivo:** ter tudo pronto para começar a programar e um repositório no GitHub.

**O que fiz**
- Instalei o Visual Studio Code.
- Configurei o Git com meu nome e com o e-mail privado que o GitHub fornece, para meu e-mail pessoal não aparecer no histórico público.
- Defini `main` como nome da branch principal, igual ao padrão do GitHub, e o VS Code como editor do Git.
- Criei o repositório `erkvvz.com.br` no GitHub e fiz meu primeiro commit e meu primeiro envio.

**Problemas e soluções**
- A primeira versão da proposta tinha sido escrita em outro tom e foi para o histórico. Como o repositório tinha só dois commits e só eu o usava, juntei os dois em um e substituí o histórico do GitHub com `git push --force-with-lease`. Aprendi que reescrever histórico já enviado só é aceitável em situações assim, sem outras pessoas trabalhando no mesmo repositório.
- Corrigi a minha assinatura nos documentos: é **ERK.**, enquanto `erkvvz` é o meu nome de usuário.

**Comandos que passei a usar:** `git init`, `git status`, `git add`, `git commit`, `git remote add`, `git push`, `git diff`, `git commit --amend`, `git reset --soft`.

---

## Entrega 2: estrutura e primeiras páginas

**Objetivo:** criar a página inicial em HTML semântico, ainda sem estilo.

**O que fiz**
- Criei a página inicial e três páginas provisórias: Sobre, Projetos e Contato.
- Usei tags semânticas (`header`, `nav`, `main`, `section`, `footer`), `lang="pt-BR"`, título e descrição em cada página, e um atalho "Pular para o conteúdo" para quem navega pelo teclado.
- Instalei a extensão Live Preview para ver o site no computador com os links funcionando.
- Configurei o e-mail `contato@erkvvz.com.br` com o roteamento de e-mail da Cloudflare ([decisão 0005](decisoes/0005-email-de-contato.md)).

**Problemas e soluções**
- Os links internos começam com `/` (por exemplo, `/sobre/`). Abrindo o arquivo com dois cliques, eles quebram, porque o navegador entende a raiz como o disco do computador. A solução foi visualizar o site por um servidor local.
- Coloquei meu telefone e meu e-mail pessoal na página de contato e tirei antes do commit, por privacidade ([decisão 0007](decisoes/0007-dados-pessoais.md)).
- O e-mail de contato demorou a funcionar: primeiro um registro antigo bloqueava o recebimento, depois faltava a regra que liga `contato@` à minha caixa de entrada.

---

## Entrega 3: site no ar

**Objetivo:** publicar o site em `https://erkvvz.com.br`.

**O que fiz**
- Escolhi a Cloudflare Workers como hospedagem ([decisão 0003](decisoes/0003-hospedagem-cloudflare-workers.md)).
- Movi as páginas para a pasta `public/` e criei o `wrangler.jsonc` ([decisão 0004](decisoes/0004-pasta-public.md)).
- Liguei o repositório do GitHub à Cloudflare. A partir daí, cada envio para a `main` publica o site sozinho.
- Liguei o domínio `erkvvz.com.br`, redirecionei o `www` para o domínio principal e obriguei o uso de HTTPS ([decisão 0006](decisoes/0006-endereco-oficial.md)).

**Problemas e soluções**
- Ao conectar a Cloudflare ao GitHub, dei acesso a todos os repositórios. Corrigi para dar acesso só ao repositório do site.
- O `www` não pôde ser adicionado como domínio do projeto. Resolvi com um registro DNS e uma regra de redirecionamento, que é inclusive a forma mais adequada para ter um endereço único.
- O `http://` continuava abrindo sem HTTPS. Liguei a opção "Sempre usar HTTPS".
- O endereço provisório da Cloudflare (`*.workers.dev`) mostrava parte do e-mail da minha conta. Desativei esse endereço.

**Como confirmei que funcionou:** testei cada combinação de endereço (com e sem `www`, com `http` e `https`, cada página) e conferi que todas terminam em `https://erkvvz.com.br`, e que arquivos fora de `public/` não ficam acessíveis.
