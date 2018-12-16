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
    transition: opacity 3s, transform 3s;
  }
  .splash.animate-out {
    opacity: 0;
    transform: scale(0.988);
  }
  h1 {
    font-size: 3.75em;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.125em;
    text-transform: lowercase;
  }
  p {
    margin-bottom: 1.5em;
  }
  button {
    font-size: 0.85rem;
    font-family: inherit;
    letter-spacing: 0.2em;
    border: 0;
    color: #FFF;
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