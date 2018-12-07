
export const TWO_PI = Math.PI * 2;

export function lerp(value, min, max) {
  return min + value * (max - min);
};

export function map(value, inMin, inMax, outMin, outMax) {
  return lerp(normalize(value, inMin, inMax), outMin, outMax);
};

export function normalize(value, min, max) {
  return (value - min) / (max - min);
};

export function fill(size, fn) {
  return [...Array(size)].map((undef, i) => fn(i));
};

export function random(min, max) {

  if(arguments.length == 0) {
    return Math.random();
  }

  if(Array.isArray(min)) {
    return min[ Math.floor(Math.random() * min.length) ];
  }

  if(typeof min == 'undefined') min = 1;
  if(typeof max == 'undefined') max = min || 1, min = 0;

  return min + Math.random() * (max - min);
};

export function toRadians(degrees) {
  return degrees * Math.PI / 180;
};

export function toRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
};