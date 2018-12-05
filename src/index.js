import Background from './background';
import Overlay from './overlay';
import Light from './light';
import { random, fill, TWO_PI } from './utils'
import { numLights, colors } from './config';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.style.cssText = 'width:100%;height:100%;';

document.body.style.cssText = 'margin:0;padding:0;overflow:hidden;';
document.body.appendChild(canvas);

const audio = new Audio();
audio.src = require('./audio.mp3');
audio.load();

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
audioContext.createMediaElementSource(audio).connect(analyser);
analyser.connect(audioContext.destination);
// analyser.smoothingTimeConstant = 0.4;
analyser.fftSize = 256;

console.log(analyser.maxDecibels, analyser.minDecibels)
analyser.maxDecibels = 0;
analyser.minDecibels = -100;

const bufferLength = analyser.frequencyBinCount;
const bufferArray = new Uint8Array(bufferLength);

// scale = this.map(freq, 0, 255, 0.001, 1);
// TweenMax.to(this.tiles[i].scale, .3, { y: scale });


const background = new Background();
const overlay = new Overlay();

let lights = [];

function draw(time) {

  const { width, height } = canvas;

  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = 'lighter';

  background.draw(context);

  lights.forEach(light => {
    light.update(time);
    light.draw(context);
  });

  context.globalCompositeOperation = 'source-over';
  overlay.draw(context);


  /* time = time * 0.001;

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
  const sign = random() > 0.5 ? -1 : 1;

  lights = fill(numLights, i => {

    const a = (i / numLights);
    const x = a * width;
    const y = (height / 2) + Math.sin(a * sign * TWO_PI) * 80 + random(-120, 120);

    return new Light({
      position: {x, y},
      radius: random(40, 60),
      color: random(colors),
      alpha: random(0.02, 0.5),
      softness: random(0.02, 0.5)
    });
  });
}

function init() {

  window.addEventListener('resize', resize);
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

  // document.body.addEventListener('click', function click(event) {
  //   document.body.removeEventListener('click', click);
  //   audio.play();
  //   audioContext.resume();
  // });

  requestAnimationFrame(draw);
}

init();