import Background from './background';
import Light from './light';
import { random, fill, lerp, TWO_PI } from './utils'
import { colors } from './config';
import './style';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
document.body.appendChild(canvas);

let lights = [];

const background = new Background();

// import Overlay from './overlay';
// const overlay = new Overlay();

const audio = new Audio();
audio.src = require('./audio.mp3');
audio.load();

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
audioContext.createMediaElementSource(audio).connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 256;
analyser.maxDecibels = 0;
analyser.minDecibels = -100;
// analyser.smoothingTimeConstant = 0.4;

const bufferLength = analyser.frequencyBinCount;
const bufferArray = new Uint8Array(bufferLength);

// scale = this.map(freq, 0, 255, 0.001, 1);
// TweenMax.to(this.tiles[i].scale, .3, { y: scale });



function draw(time) {

  time = time * 0.001;
  const { width, height } = canvas;

  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = 'lighter';

  background.draw(context);

  lights.forEach(light => {
    light.update(time);
    light.draw(context);
  });

  context.globalCompositeOperation = 'source-over';
  // overlay.draw(context);

  /*
  analyser.getByteFrequencyData(bufferArray);
  var barWidth = (width / bufferLength) * 2.5;
  var barHeight;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {
    barHeight = bufferArray[i];
    var r = barHeight// + (25 * (i / bufferLength));
    var g = 0;
    var b = 0;
    context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    context.fillRect(x, 0, barWidth, barHeight);
    x += barWidth + 1;
  } */

  // context.restore();
  // context.beginPath();
  // context.moveTo(0, height / 2);
  // context.lineTo(width, height / 2);
  // context.moveTo(width / 2, 0);
  // context.lineTo(width / 2, height);
  // context.lineWidth = 0.5;
  // context.strokeStyle = 'rgba(255,0,0,0.75)';
  // context.stroke();

  requestAnimationFrame(draw);
}

function resize(event) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function reset() {

  const { width, height } = canvas;
  const count = Math.floor(width * 0.05);
  const theta = random(TWO_PI);
  const amplitude = height * 0.08;
  const cx = width / 2;
  const cy = height / 2;

  lights = fill(count, i => {

    const percent = (i / count);
    const x = percent * width;
    const distanceToCenter = 1 - Math.abs(cx - x) / cx;
    const varianceRange = lerp(distanceToCenter, 75, 150);
    const variance = random(-varianceRange, varianceRange);
    const offset = Math.sin(theta + percent * TWO_PI) * amplitude + variance;
    const y = cy + offset;

    return new Light({
      position: {x, y},
      radius: random(30, 60),
      color: random(colors),
      alpha: random(0.05, 0.6),
      softness: random(0.02, 0.5)
    });
  });
}

function init() {

  // window.addEventListener('resize', resize);
  resize();
  reset();

  if (process.env.NODE_ENV !== 'production') {

    const dat = require('dat.gui');
    const gui = new dat.GUI();
    const pilot = lights[ Math.floor((lights.length - 1) / 3) ];

    gui.addFolder('Light');
    gui.add(pilot, 'radius', 20, 200).onChange(value => pilot.render());
    gui.add(pilot, 'alpha', 0, 1).onChange(value => pilot.render());
    gui.add(pilot, 'softness', 0, 1).onChange(value => pilot.render());
    gui.addColor(pilot, 'color').onChange(value => pilot.render());
  }

  // document.body.addEventListener('click', function start(event) {
  //   document.body.removeEventListener('click', start);
  //   audio.play();
  //   audioContext.resume();
  // });

  requestAnimationFrame(draw);
}

init();