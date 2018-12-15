
const DEBUG = false; // process.env.NODE_ENV !== 'production';

const colors = [
  // '#cf0638','#fa6632','#fecd23','#0a996f','#0a6789','#4a0206','#710006','#bb0d1a','#ef3e4d','#fdbbc1'
  '#4a0206','#710006','#bb0d1a','#fa6632','#cf0638','#ef3e4d','#fdbbc1'
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