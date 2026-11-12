# 0014. Three.js como primeira biblioteca externa

- **Data:** novembro de 2026
- **Status:** Aceita. Complementa a [decisão 0001](0001-html-css-js-puros.md).

## Contexto

Eu queria uma escultura 3D em tempo real na página inicial. Desenhar 3D no navegador direto com WebGL exige centenas de linhas só para preparar a cena. A decisão 0001 diz que o site não usa frameworks, npm nem etapa de build.

## Decisão

Uso o **Three.js** (versão r169, licença MIT), a biblioteca de 3D para a web mais usada. Ele entra no site **sem npm e sem build**:

- o arquivo `three.module.min.js` fica em `public/assets/js/vendor/`, junto com a licença;
- um *import map* no HTML diz ao navegador onde encontrá-lo quando o código pede `three`.

## Por quê

- Ele cuida da parte trabalhosa (câmera, luz, materiais metálicos, reflexos) e me deixa focar na escultura.
- Continua valendo a regra da decisão 0001: o arquivo publicado é o arquivo que está no repositório.
- Hospedar o arquivo no próprio site segue a mesma lógica das fontes (decisão 0009): sem depender de outro servidor.

## Alternativas consideradas

- **WebGL puro:** mais leve, mas muito mais código e difícil de manter.
- **Carregar o Three.js de um CDN:** mais simples, mas o site passaria a depender de outro servidor.
- **Um vídeo da escultura girando:** leve, mas sem interação com o mouse e a rolagem.

## Consequências

- O arquivo tem 671 KB, ou cerca de 135 KB comprimido. Por isso ele só é baixado depois que a página carregou, e só quando o aparelho pode (decisão [0015](0015-escultura-na-pagina-inicial.md)).
- Como não há build, o arquivo inteiro é baixado, mesmo as partes que não uso.
- Atualizar o Three.js é trocar o arquivo e testar de novo.
