import DrawingService from '../services/draw/DrawingService';
import DrawService from '../services/draw/drawService';

export default class CanvasArea extends HTMLElement {
  constructor() {
    super();
    this.context = null;
    this.width = 500;
    this.height = 500;
    this.isDrawing = false;
    this.currentTool = null;
    this._drawingService = null;

    this.handleToolSelected = this.handleToolSelected.bind(this);
    document.addEventListener('tool-selected', this.handleToolSelected);
  }
  async connectedCallback() {
    this.render();
    await Promise.resolve();
    this.initCanvas();
    this.initDrawingEvents();
  }

  render() {
    this.innerHTML = `
    <div class="main-canvas">
      <canvas id="drawingCanvas" width="${this.width}" height="${this.height}"></canvas>
    </div>
  `;
  }

  handleToolSelected(event) {
    const { tool } = event.detail;
    this.currentTool = tool;
  }

  initDrawingEvents() {
    const canvas = this.querySelector('#drawingCanvas');
    canvas.addEventListener('mousedown', (e) => {
      this.isDrawing = true;
      const { offsetX, offsetY } = e;
      this._drawingService.startDrawing(this.currentTool, offsetX, offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!this.isDrawing) return;
      const { offsetX, offsetY } = e;
      this._drawingService.previewShape(offsetX, offsetY);
    });

    canvas.addEventListener('mouseup', (e) => {
      if (!this.isDrawing) return;
      const { offsetX, offsetY } = e;
      const result = this._drawingService.finishDrawing(offsetX, offsetY);
      this.isDrawing = false;
      console.log(result);
    });

    // 캔버스 밖으로 나갔을 때도 그리기 종료
    canvas.addEventListener('mouseleave', () => {
      if (this.isDrawing) {
        this.isDrawing = false;
        this._drawingService.preview.clear();
      }
    });
  }

  initCanvas() {
    const canvas = this.querySelector('#drawingCanvas');
    this.context = canvas.getContext('2d');
    this._drawingService = new DrawingService(this.context);

    this._drawingService.createCanvas(this.width, this.height);
  }
}
customElements.define('canvas-area', CanvasArea);
