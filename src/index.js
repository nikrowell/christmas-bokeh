import html from 'facon';
import Background from './background';
import Light from './light';
import { random, fill, lerp, TWO_PI } from './utils'
import { colors, DEBUG } from './config';
import './style';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.className = 'stage';
document.body.appendChild(canvas);

const audio = new Audio();
audio.src = require('../assets/nutcracker-arabian-dance.mp3');
audio.load();

const background = new Background();

let lights = [];

function draw(time) {

  const { width, height } = canvas;

  context.save();
  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = 'lighter';

  background.draw(context);

  lights.forEach(light => {
    light.update(time);
    light.draw(context);
  });

  context.globalCompositeOperation = 'source-over';

  if (DEBUG) {

    context.restore();
    context.beginPath();
    context.moveTo(0, height * 0.333);
    context.lineTo(width, height * 0.333);
    context.moveTo(0, height * 0.667);
    context.lineTo(width, height * 0.667);
    context.moveTo(width * 0.333, 0);
    context.lineTo(width * 0.333, height);
    context.moveTo(width * 0.667, 0);
    context.lineTo(width * 0.667, height);
    context.lineWidth = 0.5;
    context.strokeStyle = 'rgba(255,10,10,0.75)';
    context.stroke();

    colors.forEach((c, i) => {
      const r = 20;
      context.beginPath();
      context.fillStyle = c;
      context.arc(20 + r + i * (r * 2 + 10), height - r - 20, r, 0, TWO_PI);
      context.fill();
    });
  }

  context.restore();
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
  const count = Math.floor(width * 0.1);
  const theta = random(TWO_PI);
  const amplitude = height * 0.08;
  const cx = width / 2;
  const cy = height / 2;

  lights = fill(count, i => {

    const percent = (i / count);
    const x = percent * width;
    const distanceToCenter = 1 - Math.abs(cx - x) / cx;
    const varianceRange = lerp(distanceToCenter, 50, 200);
    const variance = random(-varianceRange, varianceRange);
    const offset = Math.sin(theta + percent * TWO_PI) * amplitude + variance;
    const y = cy + offset;

    return new Light({
      position: {x, y},
      // radius: random(30, 50),
      // TODO: fix this logic!
      radius: random(25, Math.max(1, 80 * distanceToCenter)),
      color: random(colors),
      alpha: random(0.05, 0.6),
      softness: random(0.02, 0.5),
      twinkle: random() > 0.7
    });
  });
}

function init() {

  resize();
  reset();

  if (DEBUG) {

    const dat = require('dat.gui');
    const gui = new dat.GUI();
    const pilot = lights[ Math.floor((lights.length - 1) / 3) ];

    pilot.twinkle = {
      phase: random(TWO_PI),
      speed: random(0.001, 0.005)
    };

    gui.addFolder('Light');
    gui.add(pilot, 'radius', 20, 200).onChange(value => pilot.render());
    gui.add(pilot, 'alpha', 0, 1).onChange(value => pilot.render());
    gui.add(pilot, 'softness', 0, 1).onChange(value => pilot.render());
    gui.addColor(pilot, 'color').onChange(value => pilot.render());
    gui.close();
  }

  const ui = html`
    <div class="splash" ref="splash">
      <h1>Christmas Lights</h1>
      <p>A Christmas-inspired creative coding experiment.</p>
      <button ref="button">Click to Listen</button>
    </div>
  `;

  const { splash, button } = ui.collect();
  document.body.appendChild(ui);

  button.addEventListener('click', function start(event) {
    button.removeEventListener('click', start);
    splash.addEventListener('transitionend', () => splash.parentElement.removeChild(splash));
    splash.classList.add('animate-out');
    audio.play();
  });

  requestAnimationFrame(draw);
}

init();