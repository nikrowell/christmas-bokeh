
const DEBUG = process.env.NODE_ENV !== 'production';

const colors = [
  // TODO: choose a color or narrow down color options!
  // '#332c26','#db1414','#e8591c','#7fb8b0','#c5e65c',
  // '#452e3c','#ff3d5a','#ffb969','#eaf27e','#3b8c88',
  // '#72bca5','#f4ddb4','#f1ae2b','#bc0b27','#4a2512',
  // '#bcbdac','#cfbe27','#f27435','#f02475','#3b2d38',
  // '#351330','#424254','#64908a','#e8caa4','#cc2a41',
  // '#fe4365','#fc9d9a','#f9cdad','#c8c8a9','#83af9b',
  // '#50232e','#f77c3e','#faba66','#fce185','#a2cca5',
  // '#f6f6f6','#e8e8e8','#333333','#990100','#b90504',
  // '#ff003c','#ff8a00','#fabe28','#88c100','#00c176',
  // '#f8db7e','#ec6349','#ce2340','#6f1b2c','#310a26',
  // '#ecd078','#d95b43','#c02942','#542437','#53777a',
  // '#cf0638','#fa6632','#fecd23','#0a996f','#0a6789',
  // '#9ed99e','#f0dda6','#eb6427','#eb214e','#1a1623',
  // '#eeccbb','#f1731f','#e03e36','#bd0d59','#730662',
  '#4a0206','#710006','#bb0d1a','#ef3e4d','#fdbbc1',
];

// TODO: figure out a curve as an alternative to setTimeout or a basic
// sine wave so there's a delay between on and off twinkle states
const twinkleCurve = t => 1 - Math.cos(t);

export default {
  DEBUG,
  colors,
  twinkleCurve
};

export {
  DEBUG,
  colors,
  twinkleCurve
};