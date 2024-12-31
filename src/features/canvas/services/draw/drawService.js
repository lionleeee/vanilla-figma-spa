export default class DrawService {
  constructor(context, canvasElement) {
    this.context = context;
    this.canvas = canvasElement;
    this.currentTool = null;
    document.addEventListener('tool-selected', this.handleToolSelected);
  }

  createCanvas(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleToolSelected(e) {
    this.currentTool = e.detail.tool;
  }

  getCurrentTool() {
    return this.currentTool;
  }
}
