export class PreviewCanvas {
  constructor(originalCanvas) {
    this.canvas = this.createCanvas(originalCanvas);
    this.context = this.canvas.getContext('2d');
  }

  createCanvas(originalCanvas) {
    const canvas = document.createElement('canvas');
    canvas.width = originalCanvas.width;
    canvas.height = originalCanvas.height;
    canvas.style.position = 'absolute';
    canvas.style.top = originalCanvas.offsetTop + 'px';
    canvas.style.left = originalCanvas.offsetLeft + 'px';
    canvas.style.pointerEvents = 'none';
    originalCanvas.parentNode.appendChild(canvas);
    return canvas;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getContext() {
    return this.context;
  }
}
