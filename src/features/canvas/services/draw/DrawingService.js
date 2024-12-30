import { layerService } from '../LayerService.js';
import { ShapeRenderer } from './ShapeRender.js';
import { toolService } from './ToolService.js';
import { DragState } from './DrawDragState.js';
import { PreviewCanvas } from './PreviewCanvas.js';
import { ShapeDimensionCalculator } from './ShapeDimensionCalculator.js';

export default class DrawingService {
  constructor(context) {
    this.context = context;
    this.canvas = this.context.canvas;
    this.shapeRenderer = new ShapeRenderer(context);
    this.dragState = new DragState();
    this.previewCanvas = new PreviewCanvas(this.canvas);

    this.addEventListeners();
  }

  addEventListeners() {
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  handleMouseDown(e) {
    if (!toolService.getCurrentTool()) return;
    const point = this.getCanvasPoint(e);
    this.dragState.startDrag(point);
  }

  handleMouseMove(e) {
    if (!toolService.getCurrentTool()) return;
    this.canvas.style.cursor = 'crosshair';

    if (!this.dragState.isDragging()) return;

    const currentPoint = this.getCanvasPoint(e);
    this.previewCanvas.clear();
    this.drawPreview(currentPoint);
  }

  handleMouseUp(e) {
    if (!this.dragState.isDragging()) return;

    const endPoint = this.getCanvasPoint(e);
    this.finalizeDraw(endPoint);

    this.dragState.reset();
    this.previewCanvas.clear();
  }

  drawPreview(currentPoint) {
    const startPoint = this.dragState.getStartPoint();
    const tool = toolService.getCurrentTool();

    switch (tool) {
      case '사각형': {
        const { width, height } = ShapeDimensionCalculator.calculateRectangle(
          startPoint,
          currentPoint
        );
        this.shapeRenderer.drawRectangle(
          this.previewCanvas.getContext(),
          startPoint.x,
          startPoint.y,
          width,
          height,
          true
        );
        break;
      }
      case '원형': {
        const { radius } = ShapeDimensionCalculator.calculateCircle(
          startPoint,
          currentPoint
        );
        this.shapeRenderer.drawCircle(
          this.previewCanvas.getContext(),
          startPoint.x,
          startPoint.y,
          radius,
          true
        );
        break;
      }
    }
  }

  finalizeDraw(endPoint) {
    const startPoint = this.dragState.getStartPoint();
    const tool = toolService.getCurrentTool();

    switch (tool) {
      case '사각형': {
        const { width, height } = ShapeDimensionCalculator.calculateRectangle(
          startPoint,
          endPoint
        );
        this.shapeRenderer.drawRectangle(
          this.context,
          startPoint.x,
          startPoint.y,
          width,
          height
        );
        layerService.addLayer('rectangle', startPoint.x, startPoint.y, {
          width,
          height,
        });
        break;
      }
      case '원형': {
        const { radius } = ShapeDimensionCalculator.calculateCircle(
          startPoint,
          endPoint
        );
        this.shapeRenderer.drawCircle(
          this.context,
          startPoint.x,
          startPoint.y,
          radius
        );
        layerService.addLayer('circle', startPoint.x, startPoint.y, { radius });
        break;
      }
      case '텍스트': {
        const text = prompt('입력할 텍스트를 입력하세요:', '');
        if (!text) return;
        this.shapeRenderer.drawText(this.context, endPoint.x, endPoint.y, text);
        layerService.addLayer('text', endPoint.x, endPoint.y, { text });
        break;
      }
    }
  }

  getCanvasPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    layerService.clearLayers();
  }
}
