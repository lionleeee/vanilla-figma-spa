import { layerService } from './LayerService.js';

export default class DrawingService {
  constructor(context) {
    this.context = context;
    this.canvas = this.context.canvas;
    this.currentTool = null;
    this.startPoint = null;
    this.addEventListeners();
  }

  addEventListeners() {
    this.toolSelectedEvent();
    this.canvasClickEvent();
  }

  toolSelectedEvent() {
    document.addEventListener('tool-selected', (e) => {
      this.currentTool = e.detail.tool;
      console.log('현재 도구:', this.currentTool);
    });
  }
  canvasClickEvent() {
    this.canvas.addEventListener('click', (e) => {
      if (!this.currentTool) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      switch (this.currentTool) {
        case '사각형':
          this.drawRectangle(x, y);
          break;
        case '원형':
          this.drawCircle(x, y);
          break;
        case '텍스트':
          this.drowText(x, y);
          break;
      }
    });
  }

  drawRectangle(x, y) {
    this.context.fillStyle = 'red';
    this.context.fillRect(x - 25, y - 25, 50, 50);
    layerService.addLayer('사각형', x, y);
  }

  drawCircle(x, y) {
    this.context.beginPath();
    this.context.fillStyle = 'blue';
    this.context.arc(x, y, 25, 0, Math.PI * 2);
    this.context.fill();
    layerService.addLayer('원형', x, y);
  }

  drowText(x, y) {
    const text = prompt('입력할 텍스트를 입력하세요:', '');
    if (!text) return;

    this.context.fillStyle = 'black';
    this.context.font = '20px Arial';
    this.context.fillText(text, x, y);
    layerService.addLayer('텍스트', x, y);
  }
}
