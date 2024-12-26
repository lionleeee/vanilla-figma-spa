import DrawingService from '../services/DrowingService';

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
    this.canvas = this.querySelector('#drawingCanvas');
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawingService = new DrawingService(this.context);
  }
}
customElements.define('canvas-area', CanvasArea);
