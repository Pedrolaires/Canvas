const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  animate: true,
  frame: 0,
  lineCap: 'round'
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5; // 2 margens (esq e dir) por isso do * 0.5
    const margy = (height - gridh) * 0.5;

    for( let i = 0; i < numCells; i++){
      const col = i % cols; // achando as cols
      const row = Math.floor(i/cols); // arredonda para o int mais baixo ( 3/4 = 0) // A cada 4 i(s) aumenta 1 //

      const x = (col * cellw) + (cellw * 0.5) + margx; // já reconhecendo as margens e traduzindo para o centro da célula
      const y = (row * cellh) + (cellh * 0.5) + margy; 
      const w = cellw * 0.8;
      const h = cellh * 0.8;
      //const n = random.noise2D(x + frame * 15, y, params.freq); // numero aleatório; 3º parametro = frequencia do noise; o 4º seria para onde iria
       //essa amplitude porém ela foi para o angle // x + frame vem do animate que passamos como parametro no sketch ln 12 // *15 é a velocidade do frame
      
      const f = params.animate ? frame : params.frame;

      const n = random.noise3D(x, y, f*10, params.freq); // 3d noise -> mais orgânico



      const angle = n * Math.PI * params.amp; // angulo de rotação das linhas na grid; // amplitude do noise
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax); // escala das linhas na grid // n vai de -1 até 1, portando com (n + 1) / 2 n será sempre >= 0 

      context.save();
      context.translate(x,y);

      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5,0);
      context.lineTo(w * 0.5,0);
      context.stroke();
      context.restore();
    }

  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  folder = pane.addFolder({ title:'Controle'});
  folder.addInput(params, 'lineCap', { options: {butt: 'butt', round: 'round', square: 'square'} });
  folder.addInput(params, 'cols', { min: 2, max: 100, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 100, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100});
  folder.addInput(params, 'scaleMax', { min: 1, max: 100});

  folder = pane.addFolder({ title: 'Ruido'});
  folder.addInput(params, 'freq',{ min: -0.01, max: 0.01});
  folder.addInput(params, 'amp',{ min: 0, max: 1});
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame',{ min: 0, max: 999})
}
createPane();

canvasSketch(sketch, settings);
