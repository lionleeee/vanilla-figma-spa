import Preview from './Preview.js';
import DrawShape from './DrawShape.js';

export default class DrawingService {
  constructor(context) {
    this.context = context;
    this.canvas = context.canvas;
    this.preview = null;
    this.drawShape = new DrawShape(context);
    this.startPoint = null;
    this.currentType = null;
    this.currentId = 0;
  }

  startDrawing(type, x, y) {
    this.startPoint = { x, y };
    this.currentType = type;
  }

  createCanvas(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.preview = new Preview(this.context);
  }

  generateId() {
    return ++this.currentId;
  }

  previewShape(x, y) {
    if (!this.startPoint || !this.currentType) return;
    this.preview.previewShape(this.currentType, this.startPoint, { x, y });
  }
  quickDraw(x, y, property) {
    const { width, height, color, opacity } = property;
    this.startPoint = { x, y };
    const endPoint = {
      x: x + width,
      y: y + height,
    };

    return this.drawShape.draw(
      this.currentType,
      this.startPoint,
      endPoint,
      this.generateId(),
      { color, opacity }
    );
  }

  finishDrawing(x, y, property) {
    if (!this.startPoint || !this.currentType) return;

    const { color, opacity } = property;
    const result = this.drawShape.draw(
      this.currentType,
      this.startPoint,
      { x, y },
      this.generateId(),
      { color, opacity }
    );
    this.preview.clear();

    this.startPoint = null;
    this.currentType = null;
    return result;
  }

  reDrawing(layer) {
    const startPoint = {
      x: layer.x,
      y: layer.y,
    };

    const endPoint = {
      x: layer.x + layer.width,
      y: layer.y + layer.height,
    };

    if (layer.type === 'circle') {
      startPoint.x = layer.x;
      startPoint.y = layer.y;
      endPoint.x = layer.x + layer.radius * 2;
      endPoint.y = layer.y + layer.radius * 2;
    }
    if (layer.type === 'line') {
      endPoint.x = layer.endX;
      endPoint.y = layer.endY;
    }

    this.drawShape.draw(
      layer.type,
      startPoint,
      endPoint,
      layer.id,
      layer.properties,
      layer.radius
    );
  }

  redrawShapes(layers) {
    this.createCanvas(this.canvas.width, this.canvas.height);
    [...layers].reverse().forEach((layer) => {
      this.reDrawing(layer);
    });
  }

  handleDrawingComplete(endX, endY, startX, startY, property) {
    const deltaX = Math.abs(endX - startX);
    const deltaY = Math.abs(endY - startY);

    if (deltaX < 2 && deltaY < 2) {
      return this.quickDraw(endX, endY, property);
    } else {
      return this.finishDrawing(endX, endY, property);
    }
  }
}
