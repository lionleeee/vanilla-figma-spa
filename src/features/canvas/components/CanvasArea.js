import { eventBus } from '@/core/EventBus.js';
import DrawingService from '../services/draw/DrawingService.js';
import { layerService } from '../services/LayerService.js';

export default class CanvasArea extends HTMLElement {
  constructor() {
    super();
    this.context = null;
    this.width = 500;
    this.height = 500;
    this.isDrawing = false;
    this.currentTool = null;

    this._layerService = layerService;
  }

  async connectedCallback() {
    this.render();
    await Promise.resolve();
    this.initCanvas();
    this.initDrawingEvents();
    this.initLayerEvents();
    this.initToolEvents();
  }

  initLayerEvents() {
    eventBus.on('LAYERS_REORDERED', ({ layers }) => {
      this.redrawByZIndex(layers);
    });
  }
  initToolEvents() {
    eventBus.on('TOOL_SELECTED', ({ tool }) => {
      this.currentTool = tool;
    });
  }

  redrawByZIndex(layers) {
    this._drawingService.redrawShapes(layers);
  }
  CanvasWrapper;
  render() {
    this.innerHTML = `
    <div class="canvas-wrapper">
      <canvas id="drawingCanvas" width="${this.width}" height="${this.height}"></canvas>
    </div>
  `;
  }

  initCanvas() {
    this.canvas = this.querySelector('#drawingCanvas');
    this.context = this.canvas.getContext('2d');
    this._drawingService = new DrawingService(this.context);
    this._drawingService.createCanvas(this.width, this.height);
  }

  initDrawingEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDrawing = true;
      const { offsetX, offsetY } = e;
      this._drawingService.startDrawing(this.currentTool, offsetX, offsetY);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDrawing) return;
      const { offsetX, offsetY } = e;
      this._drawingService.previewShape(offsetX, offsetY);
    });

    this.canvas.addEventListener('mouseup', (e) => {
      if (!this.isDrawing) return;
      const { offsetX, offsetY } = e;
      const result = this._drawingService.finishDrawing(offsetX, offsetY);
      this.isDrawing = false;

      this._layerService.addLayer(
        result.id,
        this.currentTool,
        result.x,
        result.y,
        result.width,
        result.height,
        result.radius
      );
    });

    this.canvas.addEventListener('mouseleave', () => {
      if (this.isDrawing) {
        this.isDrawing = false;
        this._drawingService.preview.clear();
      }
    });
  }

  handleToolSelected(event) {
    const { tool } = event.detail;
    this.currentTool = tool;
  }
}
customElements.define('canvas-area', CanvasArea);
