import DrawPreviewService from './drawPreviewService';

export default class DrawService {
  constructor(context, canvasElement) {
    this.context = context;
    this.canvas = canvasElement;
    this.currentTool = null;

    this.isDragging = false; // 드래그 상태 추적
    this.lastX = 0; // 마지막 X 좌표
    this.lastY = 0; // 마지막 Y 좌표

    //툴 선택 이벤트
    this.handleToolSelected = this.handleToolSelected.bind(this);
    document.addEventListener('tool-selected', this.handleToolSelected);

    //마우스 이벤트
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);

    // 프리뷰 서비스 초기화
    this.previewService = new DrawPreviewService(this.canvas);

    // 프리뷰 캔버스 스타일 설정
  }

  createCanvas(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.previewService.initialize(
      width,
      height,
      this.canvas.offsetTop,
      this.canvas.offsetLeft
    );
  }

  handleMouseDown(event) {
    this.isDragging = true;
    const { x, y } = this.getMousePosition(event);
    this.startX = x;
    this.startY = y;
  }
  handleMouseMove(event) {
    if (!this.isDragging) return;

    const { x, y } = this.getMousePosition(event);

    // 프리뷰 초기화
    this.previewService.clear();

    switch (this.currentTool) {
      case '사각형':
        this.previewService.drawRectanglePreview(
          this.startX,
          this.startY,
          x,
          y
        );
        break;
    }
  }
  handleMouseUp(event) {
    if (!this.isDragging) return;

    this.previewService.clear();
    this.isDragging = false;
  }

  getMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
  handleToolSelected(e) {
    this.currentTool = e.detail.tool;
  }

  getCurrentTool() {
    return this.currentTool;
  }
}
