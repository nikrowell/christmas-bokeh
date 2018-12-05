import Light from './light';
import { random } from './utils';
import { colors } from './config';

export default class Background {

  constructor({
    base = '#0C0000'
  } = {}) {

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    this.canvas = canvas;
    this.context = context; // thiss.ca.createElement('canvas');

    const width = window.innerWidth;
    const height = window.innerHeight;
    context.canvas.width = width;
    context.canvas.height = height;
    context.globalCompositeOperation = 'lighter';
    context.beginPath();
    context.fillStyle = base;
    context.fillRect(0, 0, width, height);

    const count = Math.floor(0.05 * width);

    for (let i = 0; i < count; i++) {

      const light = new Light({
        radius: random(200, 400),
        alpha: random(0.01, 0.05),
        softness: random(0.25, 0.9),
        color: random(colors)
      });

      context.drawImage(
        light.canvas,
        random(width) - light.radius,
        (height / 2) - light.radius + random(-200, 200)
      );
    }
  }

  render() {

  }

  draw(context) {
    context.drawImage(this.canvas, 0, 0);
  }
}