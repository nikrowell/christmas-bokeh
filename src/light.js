import { TWO_PI, toRGB, toRadians, random } from './utils';

export default class Light {

  constructor({
    position,
    radius,
    color = '#FFFFFF',
    alpha = 0.5,
    softness = 0.1,
  } = {}) {

    this.ctx = document.createElement('canvas').getContext('2d');
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.alpha = alpha;
    this.softness = softness;
    this.render();
  }

  get canvas() {
    return this.ctx.canvas;
  }

  // get x() { return this.position.x; }
  // get y() { return this.position.y; }
  // get z() { return this.position.z; }

  render() {

    const { ctx, radius, color, alpha, softness } = this;
    const [ r, g, b ] = toRGB(color);
    const gradient = ctx.createRadialGradient(0, 0, radius, 0, 0, 0);

    gradient.addColorStop(0,        `rgba(${r},${g},${b},0)`);
    gradient.addColorStop(softness, `rgba(${r},${g},${b},${alpha})`);
    gradient.addColorStop(1,        `rgba(${r},${g},${b},${alpha})`);

    ctx.canvas.width = ctx.canvas.height = radius * 2;
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, TWO_PI);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  update(time) {
    // this.scale = 1 + Math.sin(time * 0.0015) / 2 * 0.091026;
    // this.scale = Math.abs( * 50);
    // console.log(this.scale)
  }

  draw(context) {
    const { x, y } = this.position;
    context.save();
    context.translate(x - this.radius, y - this.radius);
    // context.scale(this.scale, this.scale);
    context.drawImage(this.ctx.canvas, 0, 0);
    context.restore();
  }
}