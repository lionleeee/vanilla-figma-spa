export default class DrawPreviewService {
  constructor(mainCanvas) {
    // 프리뷰 캔버스 생성 및 설정
    this.previewCanvas = document.createElement('canvas');
    this.previewContext = this.previewCanvas.getContext('2d');

    this.previewCanvas.style.position = 'absolute';
    this.previewCanvas.style.pointerEvents = 'none';

    mainCanvas.parentNode.appendChild(this.previewCanvas);
  }

  initialize(width, height, top, left) {
    this.previewCanvas.width = width;
    this.previewCanvas.height = height;
    this.previewCanvas.style.top = top + 'px';
    this.previewCanvas.style.left = left + 'px';
  }

  clear() {
    this.previewContext.clearRect(
      0,
      0,
      this.previewCanvas.width,
      this.previewCanvas.height
    );
  }

  drawRectanglePreview(startX, startY, endX, endY) {
    this.previewContext.strokeStyle = '#212121';
    this.previewContext.lineWidth = 2;
    const width = endX - startX;
    const height = endY - startY;
    this.previewContext.strokeRect(startX, startY, width, height);
  }
}
