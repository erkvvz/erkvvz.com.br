# 0003. Hospedagem na Cloudflare Workers

- **Data:** novembro de 2026
- **Status:** Aceita

## Contexto

O site precisa de hospedagem. Eu não queria pagar por isso antes de ter uma necessidade real, e o DNS do domínio `erkvvz.com.br` já estava na Cloudflare.

Meu plano inicial era usar a Cloudflare Pages. Quando fui publicar, a documentação da Cloudflare passou a recomendar o Workers, com arquivos estáticos, para projetos novos. O Pages continua funcionando, mas as novidades estão indo para o Workers.

## Decisão

Hospedo o site na Cloudflare Workers, ligada ao repositório do GitHub. Cada envio para a branch `main` publica o site automaticamente.

## Por quê

- É gratuito para um site estático.
- O domínio já está na Cloudflare, então ligar o endereço foi direto.
- O HTTPS é automático.
- Publicar a cada `git push` faz o histórico do repositório e o site no ar andarem juntos.

## Alternativas consideradas

- **Cloudflare Pages:** o plano original. Descartado por ser a opção que a própria Cloudflare deixou de recomendar para projetos novos.
- **GitHub Pages:** também é gratuito, mas exigiria apontar o DNS para fora da Cloudflare, sem nenhuma vantagem para este projeto.
- **Hospedagem paga:** sem necessidade neste momento.

## Consequências

- O arquivo `wrangler.jsonc`, na raiz do projeto, guarda a configuração: o nome do projeto e a pasta publicada.
- O nome do projeto no painel da Cloudflare precisa ser igual ao do `wrangler.jsonc`.
