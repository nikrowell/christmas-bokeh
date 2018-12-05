const css = o => o;

const styles = document.createTextNode(css`

*, *:after, *:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`);

const style = document.createElement('style');
style.appendChild(styles);
document.head.appendChild(style);