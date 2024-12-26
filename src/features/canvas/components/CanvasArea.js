export default class CanvasArea extends HTMLElement {
  constructor() {
    super();
    this.context = null;
    this.width = 500;
    this.height = 500;
  }
  async connectedCallback() {
    this.render();
    await Promise.resolve();
    this.initCanvas();
  }

  render() {
    this.innerHTML = `
    <div class="main-canvas">
      <canvas id="drawingCanvas" width="${this.width}" height="${this.height}"></canvas>
    </div>
  `;
  }

  initCanvas() {
    this.canvas = this.querySelector('#drawingCanvas');
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
customElements.define('canvas-area', CanvasArea);
