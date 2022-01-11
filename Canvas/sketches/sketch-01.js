const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height); // Fundo do canvas

    context.strokeStyle = "#FFF";  // cor dos Strokes dentrodo canvas
    const w = width * 0.10; // Largura do quadrado
    const h = height * 0.10; //Altura do quadrado
    const gap = width * 0.03; // espaçamento entre os quadrados
    context.lineWidth = 4  // largura da linha
    for(let i = 0; i < 6 ; i++){ // criação das colunas
      for(let j = 0; j < 6;j++){ // criação das linhas
        let x = width * 0.1 + (w + gap) * i; // lugar onde será desenhado / colunas
        let y = width * 0.1 + (h + gap) * j; // same mas em linhas
        context.beginPath(); // começar o desenho
        context.rect(x, y, w, h); // desenhar a reta
        context.stroke(); // desenhar o stroke

        if(Math.random() > 0.5){ // quadrados inside randomicamente.
          context.lineWidth = 16
          context.beginPath();
          context.rect(x + (width*0.012), y + (width*0.012), w - (width*0.024), h - (width*0.024));
          context.stroke();
          context.lineWidth = 4
        }

/*        if(Math.random() > 0.5){
          context.beginPath();
          context.arc(x + (width*0.05), y + (width*0.05),width*0.05, 0, Math.PI*2);
          context.stroke();
        }*/

      }
    }
  };
};

canvasSketch(sketch, settings);
