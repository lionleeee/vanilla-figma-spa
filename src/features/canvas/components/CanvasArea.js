import { eventBus } from '@/core/event/EventBus.js';
import DrawingService from '../services/draw/DrawingService.js';
import { layerService } from '../services/LayerService.js';
import { initDragAndDrop } from '../utils/dragAndDrop.js';
import './CanvasSettingModal.js';
import { EVENTS } from '../../../core/event/Events.js';

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
      text: 'Text',
    };
    this._layerService = layerService;
    this.startX = null;
    this.startY = null;
    this.clickThreshold = 3;
  }

  connectedCallback() {
    this.render();
    this.showCanvasSettingModal();
    this.handleCanvasEvents();
    this.handleLayerEvents();
    this.handleToolEvents();
    this.handlePropertyEvents();
    this.handleResetEvent();
    initDragAndDrop(this);
  }
  createCanvasSettingModal() {
    const modal = document.createElement('canvas-setting-modal');
    document.body.appendChild(modal);
  }
  handleCanvasEvents() {
    eventBus.on(EVENTS.CANVAS.CREATED, ({ width, height }) => {
      this.handleCanvasCreated(width, height);
    });
  }

  handleLayerEvents() {
    eventBus.on(EVENTS.LAYER.REORDERED, ({ layers }) => {
      this.handleLayerReorder(layers);
    });
  }
  handleToolEvents() {
    eventBus.on(EVENTS.TOOL.SELECTED, ({ tool }) => {
      this.handleToolSelect(tool);
    });
  }

  handlePropertyEvents() {
    eventBus.on(EVENTS.PROPERTY.WIDTH_CHANGED, ({ width }) => {
      this.handlePropertyUpdate('width', width);
    });
    eventBus.on(EVENTS.PROPERTY.HEIGHT_CHANGED, ({ height }) => {
      this.handlePropertyUpdate('height', height);
    });
    eventBus.on(EVENTS.PROPERTY.COLOR_CHANGED, ({ color }) => {
      this.handlePropertyUpdate('color', color);
    });
    eventBus.on(EVENTS.PROPERTY.OPACITY_CHANGED, ({ opacity }) => {
      this.handlePropertyUpdate('opacity', opacity);
    });
    eventBus.on(EVENTS.PROPERTY.TEXT_CHANGED, ({ text }) => {
      this.handlePropertyUpdate('text', text);
    });
  }

  handlePropertyUpdate(property, value) {
    this.currentProperty[property] = value;
  }

  handleToolSelect(tool) {
    this.currentTool = tool;
  }

  handleResetEvent() {
    eventBus.on(EVENTS.CANVAS.RESET, () => {
      this.handleCanvasReset();
    });
  }

  handleCanvasReset() {
    this.width = null;
    this.height = null;
    this._drawingService = null;
    this.context = null;

    this._layerService.clearLayers();
    this.resetCanvas();
    this.showCanvasSettingModal();
  }

  resetCanvas() {
    this.innerHTML = `
      <div class="canvas-wrapper">
        <canvas id="drawingCanvas"></canvas>
      </div>
    `;
  }

  handleDrawingEvents() {
    this.canvas.addEventListener(
      'mousedown',
      this.handleDrawingStart.bind(this)
    );
    this.canvas.addEventListener(
      'mousemove',
      this.handleDrawingMove.bind(this)
    );
    this.canvas.addEventListener('mouseup', this.handleDrawingEnd.bind(this));
    this.canvas.addEventListener(
      'mouseleave',
      this.handleDrawingCancel.bind(this)
    );
  }

  handleDrawingStart(e) {
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
  }

  handleDrawingMove(e) {
    if (!this.isDrawing) return;
    const { offsetX, offsetY } = e;
    this._drawingService.previewShape(offsetX, offsetY);
  }

  handleDrawingEnd(e) {
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

    this.resetDrawingState();
  }

  handleDrawingCancel() {
    if (this.isDrawing) {
      this.resetDrawingState();
      this._drawingService.preview.clear();
    }
  }

  resetDrawingState() {
    this.isDrawing = false;
    this.startX = null;
    this.startY = null;
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

  handleCanvasCreated(width, height) {
    this.width = width;
    this.height = height;
    this.initCanvas();
    this.handleDrawingEvents();
    initDragAndDrop(this);
  }

  handleLayerReorder(layers) {
    this.redrawByZIndex(layers);
  }
}
customElements.define('canvas-area', CanvasArea);
