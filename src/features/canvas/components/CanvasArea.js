import { eventBus } from '@/core/EventBus.js';
import DrawingService from '../services/draw/DrawingService.js';
import { layerService } from '../services/LayerService.js';
import { initDragAndDrop } from '../utils/dragAndDrop.js';
import './CanvasSettingModal.js';

export default class CanvasArea extends HTMLElement {
  constructor() {
    super();
    this.context = null;
    this.width = null;
    this.height = null;
    this.isDrawing = false;
    this.currentTool = null;
    this.currentProperty = {
      width: 100,
      height: 100,
      color: '#000',
      opacity: 1,
    };
    this._layerService = layerService;
    this.startX = null;
    this.startY = null;
    this.clickThreshold = 3;
  }

  connectedCallback() {
    this.render();
    this.showCanvasSettingModal();
    this.initCanvasEvents();
    this.initLayerEvents();
    this.initToolEvents();
    this.initPropertyEvents();
    this.initResetEvent();
    initDragAndDrop(this);
  }
  showCanvasSettingModal() {
    const modal = document.createElement('canvas-setting-modal');
    document.body.appendChild(modal);
  }
  initCanvasEvents() {
    eventBus.on('CANVAS_CREATED', ({ width, height }) => {
      this.width = width;
      this.height = height;
      this.initCanvas();
      this.initDrawingEvents();
      initDragAndDrop(this);
    });
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

  initPropertyEvents() {
    eventBus.on('WIDTH_CHANGED', ({ width }) => {
      this.currentProperty.width = width;
    });
    eventBus.on('HEIGHT_CHANGED', ({ height }) => {
      this.currentProperty.height = height;
    });
    eventBus.on('COLOR_CHANGED', ({ color }) => {
      this.currentProperty.color = color;
    });
    eventBus.on('OPACITY_CHANGED', ({ opacity }) => {
      this.currentProperty.opacity = opacity;
    });
  }

  initResetEvent() {
    eventBus.on('CANVAS_RESET', () => {
      this.width = null;
      this.height = null;
      this._drawingService = null;
      this.context = null;

      this._layerService.clearLayers();

      this.innerHTML = `
        <div class="canvas-wrapper">
          <canvas id="drawingCanvas"></canvas>
        </div>
      `;

      this.showCanvasSettingModal();
    });
  }

  redrawByZIndex(layers) {
    this._drawingService.redrawShapes(layers);
  }

  render() {
    this.innerHTML = `
    <div class="canvas-wrapper">
      <canvas id="drawingCanvas" ></canvas>
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
      this.startX = offsetX;
      this.startY = offsetY;
      this._drawingService.startDrawing(
        this.currentTool,
        offsetX,
        offsetY,
        this.currentProperty
      );
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDrawing) return;
      const { offsetX, offsetY } = e;
      this._drawingService.previewShape(offsetX, offsetY);
    });

    this.canvas.addEventListener('mouseup', (e) => {
      if (!this.isDrawing) return;
      const { offsetX, offsetY } = e;

      const result = this._drawingService.handleDrawingComplete(
        offsetX,
        offsetY,
        this.startX,
        this.startY,
        this.currentProperty
      );

      if (result) {
        this._layerService.addLayer(
          result.id,
          this.currentTool,
          result.x,
          result.y,
          result.width || result.endX,
          result.height || result.endY,
          result.radius,
          result.properties
        );
      }

      this.isDrawing = false;
      this.startX = null;
      this.startY = null;
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
