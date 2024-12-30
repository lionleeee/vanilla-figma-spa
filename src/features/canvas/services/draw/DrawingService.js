import { layerService } from '.././LayerService.js';
import { ShapeRenderer } from './ShapeRender.js';

export default class DrawingService {
  constructor(context) {
    this.context = context;
    this.canvas = this.context.canvas;
    this.currentTool = null;
    this.shapeRenderer = new ShapeRenderer(context);
    this.addEventListeners();
  }

  addEventListeners() {
    this.canvasClickEvent();
    this.canvasMouseMoveEvent();
    this.toolSelectedEvent();
  }

  canvasMouseMoveEvent() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.canvas.style.cursor = this.currentTool ? 'crosshair' : 'default';
    });
  }

  canvasClickEvent() {
    this.canvas.addEventListener('click', (e) => {
      if (!this.currentTool) return;
      const point = this.getCanvasPoint(e);
      this.handleDrawing(point);
    });
  }

  getCanvasPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  handleDrawing({ x, y }) {
    console.log(x, y);
    switch (this.currentTool) {
      case '사각형':
        this.shapeRenderer.drawRectangle(x, y);
        layerService.addLayer('rectangle', x, y);
        break;
      case '원형':
        this.shapeRenderer.drawCircle(x, y);
        layerService.addLayer('circle', x, y);
        break;
      case '텍스트':
        const text = prompt('입력할 텍스트를 입력하세요:', '');
        if (!text) return;
        this.shapeRenderer.drawText(x, y, text);
        layerService.addLayer('text', x, y);
        break;
    }
  }

  setTool(toolName) {
    this.currentTool = toolName;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    layerService.clearLayers();
  }

  resizeCanvas(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  getCurrentTool() {
    return this.currentTool;
  }
  toolSelectedEvent() {
    document.addEventListener('tool-selected', (e) => {
      this.setTool(e.detail.tool);
    });
  }
}
