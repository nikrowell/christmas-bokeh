const css = o => o;
const styles = document.createTextNode(css`

  :root {
    font-size: 15px;
    font-family: clarendon-urw, serif;
    font-weight: 300;
  }

  @media screen and (min-width: 400px) {
    :root { font-size: calc(15px + (20 - 15) * (100vw - 400px) / (1000 - 400)); }
  }
  @media screen and (min-width: 1000px) {
    :root { font-size: 20px; }
  }

  *, *:after, *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    overflow: hidden;
    background-color: #0C0000;
  }
  .stage {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
  .splash {
    text-align: center;
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    user-select: none;
    cursor: default;
    mix-blend-mode: overlay;
  }
  h1 {
    font-size: 3.75em;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.125em;
    text-transform: lowercase;
  }
  p {
    margin-bottom: 2em;
  }
  button {
    padding: 1em 2em;
    font-size: 1em;
    font-family: inherit;
    font-weight: 500;
    letter-spacing: 0.05em;
    border: 0;
    color: #FFF;
    border: #FFF 2px solid;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    outline: none;
    text-transform: uppercase;
    -webkit-appearance: none;
  }
`);

const style = document.createElement('style');
style.appendChild(styles);
document.head.appendChild(style);