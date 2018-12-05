export default class Overlay {

  constructor({
    size = 5,
    thickness = 1,
    color = 0x000000,
    alpha = 0.08
  } = {}) {

    const pattern = document.createElement('canvas').getContext('2d');
    const canvas = pattern.canvas;
    canvas.width = size;
    canvas.height = size;

    pattern.rect(0, 0, size, thickness);
    pattern.rect(size - thickness, 0, size, size);
    pattern.globalAlpha = alpha;
    pattern.fillStyle = typeof color === 'number' ? `#${color.toString(16)}` : color;
    pattern.fill();

    this.pattern = pattern.createPattern(canvas, 'repeat');
  }

  draw(context) {
    context.fillStyle = this.pattern;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }
}