# 0006. Um único endereço oficial, com HTTPS e sem www

- **Data:** novembro de 2026
- **Status:** Aceita

## Contexto

O mesmo site pode ser acessado de quatro formas: com ou sem `www`, com `http://` ou `https://`. Sem uma regra, o site aparece em vários endereços diferentes.

## Decisão

O endereço oficial é `https://erkvvz.com.br`. Todas as outras formas redirecionam para ele com um redirecionamento permanente (código 301):

- `http://` vira `https://` (opção "Sempre usar HTTPS" da Cloudflare);
- `www.erkvvz.com.br` vira `erkvvz.com.br` (uma regra de redirecionamento da Cloudflare), mantendo a página e os parâmetros do endereço.

## Por quê

- Com HTTPS, o que trafega entre o visitante e o site fica protegido, e os navegadores não marcam o site como "Não seguro".
- Um endereço único evita que os mecanismos de busca tratem o site como conteúdo duplicado.
- Sem `www`, o endereço é mais curto e é o mesmo que eu divulgo.

## Consequências

- O nome `www` existe no DNS só para receber a visita e redirecioná-la.
- O endereço provisório da Cloudflare (`*.workers.dev`) foi desativado, então o site só responde pelo domínio.
