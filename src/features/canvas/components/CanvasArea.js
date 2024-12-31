import DrawService from '../services/draw/drawService';

export default class CanvasArea extends HTMLElement {
  constructor() {
    super();
    this.context = null;
    this.width = 500;
    this.height = 500;
    this._drawingService = null;
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
    const canvas = this.querySelector('#drawingCanvas');
    const drawService = new DrawService(this.context, canvas);
    drawService.createCanvas(this.width, this.height);
  }
}
customElements.define('canvas-area', CanvasArea);
