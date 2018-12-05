import palettes from 'nice-color-palettes/1000';
import { random } from './utils';

const colors = [
  // '#FF8A00','#0095FF','#00CB4A','#930101','#DF0000','#D9DFDC','#B0BFC2'
  // '#332c26','#db1414','#e8591c','#7fb8b0','#c5e65c'
  // '#452e3c','#ff3d5a','#ffb969','#eaf27e','#3b8c88'
  // '#72bca5','#f4ddb4','#f1ae2b','#bc0b27','#4a2512'
  // '#7a5b3e','#fafafa','#fa4b00','#cdbdae','#1f1f1f'
  // '#bcbdac','#cfbe27','#f27435','#f02475','#3b2d38'
  // '#351330','#424254','#64908a','#e8caa4','#cc2a41'
  // '#fe4365','#fc9d9a','#f9cdad','#c8c8a9','#83af9b'
  // '#ffe181','#eee9e5','#fad3b2','#ffba7f','#ff9c97'
  // '#a8e6ce','#dcedc2','#ffd3b5','#ffaaa6','#ff8c94'
  // '#4c3d31','#f18273','#f2bd76','#f4f5de','#c4ceb0'
  // '#50232e','#f77c3e','#faba66','#fce185','#a2cca5'
  // '#556270','#4ecdc4','#c7f464','#ff6b6b','#c44d58'
  // '#f6f6f6','#e8e8e8','#333333','#990100','#b90504'
  // '#ff003c','#ff8a00','#fabe28','#88c100','#00c176'
  // '#f8db7e','#ec6349','#ce2340','#6f1b2c','#310a26'
  // '#ecd078','#d95b43','#c02942','#542437','#53777a'
  ...random(palettes)
];

console.log(colors.map(c => `'${c}'`).join(','));

export default {
  colors
};

export {
  colors
};