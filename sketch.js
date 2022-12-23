import canvasSketch from 'canvas-sketch';

const settings = {
  dimensions: [2048, 2048],
  animate: true,
  duration: 3,
};

const angleLimit = Math.PI / 4;
class MyLine {
  constructor(x, y, l, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.l = l;
    this.da = Math.PI / 1000;
  }

  draw(context){
    const x2 = this.x + this.l * Math.cos(this.angle);
    const y2 = this.y + this.l * Math.sin(this.angle);
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(x2, y2);
    context.stroke();
  }
  moveALittle(){
    this.angle += this.da;
    if(Math.abs(Math.PI / 2 - this.angle) >= angleLimit){
      this.da *= -1;
    }
  }
}
let lines = [];
const n = 40;
let angle = Math.PI / 2;
let da = (Math.PI / 25);

let l =  2048/ 3;
const dl = l / 100;
for (let i = 0; i < n; i++) {
  angle += da;
  if(Math.abs(Math.PI / 2 - angle) > angleLimit){
    da = -da;
  }
  l += dl;
  lines.push(new MyLine(2048/2, i*(2048/n), l, angle));
}

const sketch = async () => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = '#333';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = '#AAA';
    context.lineWidth = 4;
    const center = width / 2;
    
    
    let angle = Math.PI / 2 * (playhead + 0.5);
    let da = (Math.PI / 25);

    const dx = (height - l) / n;
    const flip = 16;
    for(let line of lines){
      line.draw(context);
      line.moveALittle();
    }
  };
};

canvasSketch(sketch, settings);
