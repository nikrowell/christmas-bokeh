import { random, fill, TWO_PI } from './utils'
import Light from './light';
import Background from './background';
import Overlay from './overlay';
import settings from './settings';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.style.cssText = 'width:100%;height:100%;';

document.body.style.cssText = 'margin:0;padding:0;overflow:hidden;';
document.body.appendChild(canvas);


import palettes from 'nice-color-palettes/500';
const colors = [
  // '#FF8A00','#0095FF','#00CB4A','#930101','#DF0000','#D9DFDC','#B0BFC2'
  // '#452e3c','#ff3d5a','#ffb969','#eaf27e','#3b8c88'
  // '#72bca5','#f4ddb4','#f1ae2b','#bc0b27','#4a2512'
  // '#bcbdac','#cfbe27','#f27435','#f02475','#3b2d38'
  // '#351330','#424254','#64908a','#e8caa4','#cc2a41'
  // '#fe4365','#fc9d9a','#f9cdad','#c8c8a9','#83af9b'
  // '#ffe181','#eee9e5','#fad3b2','#ffba7f','#ff9c97'
  // '#a8e6ce','#dcedc2','#ffd3b5','#ffaaa6','#ff8c94'
  // '#332c26','#db1414','#e8591c','#7fb8b0','#c5e65c'
  // '#4c3d31','#f18273','#f2bd76','#f4f5de','#c4ceb0'
  // '#50232e','#f77c3e','#faba66','#fce185','#a2cca5'
  ...random(palettes)
];

console.log(colors.map(c => `'${c}'`).join(','));

// const uniforms = {
//   mouse: new Vec2(),
//   resolution: []
// };

const audio = new Audio();
audio.src = require('./bensound-memories.mp3');
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

  lights = fill(settings.numLights, i => {

    const a = (i / settings.numLights);
    const x = a * width;
    const y = (height / 2) + Math.sin(-a * TWO_PI) * 80 + random(-120, 120);

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