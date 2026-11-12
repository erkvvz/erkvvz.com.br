# 0016. A escultura acorda quando o visitante está presente

- **Data:** novembro de 2026
- **Status:** Aceita. Complementa a [decisão 0015](0015-escultura-na-pagina-inicial.md).

## Contexto

A escultura "No ties" ficava se mexendo o tempo todo. No celular, ainda havia uma pequena travada ao abrir, quando o 3D é preparado. Olhando outros sites, gostei da ideia de uma peça que fica parada até a pessoa começar a usar a página. Comparei três versões no laboratório: a que estava no ar, uma mais lenta, e uma que acorda quando o visitante interage.

## Decisão

A escultura começa **calma**: quase parada e com 35% do brilho. Quando a pessoa rola, toca na tela, mexe o mouse ou aperta uma tecla, ela **acorda** em menos de 1 segundo: ganha brilho total e volta a se mexer. Depois de 6 segundos sem interação, ela **se acalma** de novo, aos poucos.

A velocidade também caiu de 1.1 para 0.6: acordada, ela se move de forma mais lenta e contínua.

## Por quê

- **Combina com No ties:** é a presença de quem visita que faz o nó se mexer e se soltar.
- **Mais editorial:** a página abre calma, e o movimento vira uma resposta, não um enfeite constante disputando com o texto.
- **Esconde a travada de preparação:** enquanto o 3D é preparado, nada na tela está se mexendo.
- **Economiza bateria:** calma, a escultura é desenhada só uma vez a cada quatro quadros.

## Consequências

- Quem abre a página e não mexe em nada vê a escultura parada e apagada.
- O brilho é controlado por uma variável CSS, `--energia`, que vai de 0 a 1 e é atualizada a cada quadro pela escultura.
- Sem o 3D (por exemplo, com "reduzir movimento" ligado), a imagem estática fica com o brilho normal.
- Como a imagem estática e o primeiro quadro do 3D são iguais e têm o mesmo brilho, a troca entre os dois agora é instantânea, sem fade.
