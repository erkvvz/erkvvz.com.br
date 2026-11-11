# 0005. E-mail de contato pelo roteamento da Cloudflare

- **Data:** novembro de 2026
- **Status:** Aceita

## Contexto

O site precisa de um e-mail de contato. Eu não queria divulgar meu e-mail pessoal, nem pagar por um serviço de e-mail antes de precisar.

Até então, o domínio estava configurado para não enviar nem receber e-mails: um registro MX nulo, um SPF que proibia qualquer envio e um DMARC que rejeitava e-mails falsos.

## Decisão

Uso o endereço `contato@erkvvz.com.br` com o roteamento de e-mail da Cloudflare (Email Routing). Ele recebe as mensagens e as encaminha para uma caixa de entrada minha, sem revelar qual.

## Por quê

- É gratuito.
- Quem escreve só vê o endereço do domínio.
- Fica tudo no mesmo painel em que já está o DNS.

## Alternativas consideradas

- **Publicar meu e-mail pessoal:** descartado por privacidade (veja a decisão [0007](0007-dados-pessoais.md)).
- **Google Workspace:** permite enviar e responder como `contato@`, mas custa por mês. Fica para quando houver necessidade real.

## Consequências

- O registro MX nulo e o SPF antigo foram substituídos pelos registros da Cloudflare. O DMARC com `p=reject` foi mantido, para continuar bloqueando e-mails falsos em nome do domínio.
- O endereço só recebe. Responder a partir de `contato@` exigiria outro serviço.
- A regra "pegar tudo" (catch-all) fica desligada, para não receber spam enviado a endereços inventados.
