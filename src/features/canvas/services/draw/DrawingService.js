import { layerService } from '.././LayerService.js';
import { ShapeRenderer } from './ShapeRender.js';
import { toolService } from './ToolService.js';
export default class DrawingService {
  constructor(context) {
    this.context = context;
    this.canvas = this.context.canvas;
    this.shapeRenderer = new ShapeRenderer(context);

    this.addEventListeners();
  }

  addEventListeners() {
    this.canvasClickEvent();
    this.canvasMouseMoveEvent();
  }

  canvasMouseMoveEvent() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.canvas.style.cursor = toolService.getCurrentTool()
        ? 'crosshair'
        : 'default';
    });
  }

  canvasClickEvent() {
    this.canvas.addEventListener('click', (e) => {
      if (!toolService.getCurrentTool()) return;
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
    switch (toolService.getCurrentTool()) {
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

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    layerService.clearLayers();
  }

  resizeCanvas(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
