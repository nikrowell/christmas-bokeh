import { TWO_PI, toRGB, normalize, random } from './utils';

export default class Light {

  constructor({
    position,
    radius,
    color = '#FFFFFF',
    alpha = 0.5,
    softness = 0.1,
  } = {}) {

    this.graphics = document.createElement('canvas').getContext('2d');
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.alpha = alpha;
    this.softness = softness;
    // this.twinkle = false; // random() > 0.5 ? false : {};
    // this.scale = 1;
    // this.phase = random(TWO_PI);
    // this.speed = 1; // random(0.2, 1.2);

    this.render();
  }

  get canvas() {
    return this.graphics.canvas;
  }

  get x() { return this.position.x - this.radius; }
  get y() { return this.position.y - this.radius; }
  // get z() { return this.position.z; }

  render() {

    const { graphics, radius, color, alpha, softness } = this;
    const [ r, g, b ] = toRGB(color);
    const gradient = graphics.createRadialGradient(0, 0, radius, 0, 0, 0);

    gradient.addColorStop(0,        `rgba(${r},${g},${b},0)`);
    gradient.addColorStop(softness, `rgba(${r},${g},${b},${alpha})`);
    gradient.addColorStop(1,        `rgba(${r},${g},${b},${alpha})`);

    this.canvas.width = radius * 2
    this.canvas.height = radius * 2;

    graphics.translate(radius, radius);
    graphics.beginPath();
    graphics.arc(0, 0, radius, 0, TWO_PI);
    graphics.fillStyle = gradient;
    graphics.fill();
  }

  update(time) {
    if (this.twinkle === false) return;
    // this.scale = (1 + Math.sin(time * this.speed) / 2) * this.amplitude;
    // this.scale = normalize(Math.sin(time * this.speed), -1, 1) * 1;
    // this.scale = 1 + Math.sin(time * 0.0015) / 2 * 0.091026;
    // this.scale = Math.abs( * 50);
    // console.log(this.scale)
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    // context.scale(this.scale, this.scale);
    context.drawImage(this.canvas, 0, 0);
    context.restore();
  }
}