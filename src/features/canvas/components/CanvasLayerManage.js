import { eventBus } from '@/core/event/EventBus.js';

import { layerService } from '../services/LayerService.js';
import { initDragAndDrop } from '../utils/dragAndDrop.js';
import { EVENTS } from '../../../core/event/Events.js';

export default class CanvasLayerManage extends HTMLElement {
  constructor() {
    super();
    this.layers = [];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();

    initDragAndDrop(this);
  }

  handleDrop(e) {
    const { target, data, isAbove } = e.detail;

    if (target) {
      layerService.changeLayerZIndex(data, target, isAbove);
    }
  }

  addEventListeners() {
    eventBus.on(EVENTS.LAYER.UPDATED, (layerData) => {
      this.layers = layerData.layers ?? [];
      this.renderLayers();
    });

    eventBus.on('LAYER_DROPPED', ({ droppedId, targetId, isAbove }) => {
      layerService.changeLayerZIndex(droppedId, targetId, isAbove);
    });

    this.addEventListener('click', (e) => {
      const layerName = e.target.closest('.layer-name');
      if (layerName) {
        const layerItem = layerName.closest('.layer-item');
        const id = Number(layerItem.dataset.id);
        this.startEditing(layerName, id);
      }
    });
  }

  startEditing(nameElement, layerId) {
    const currentName = nameElement.textContent;
    const input = document.createElement('input');
    input.value = currentName;
    input.className = 'layer-name-input';

    const finishEditing = () => {
      const newName = input.value.trim();
      if (newName && newName !== currentName) {
        layerService.updateLayerName(layerId, newName);
      } else {
        this.renderLayers();
      }
    };

    input.addEventListener('blur', finishEditing);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        finishEditing();
      } else if (e.key === 'Escape') {
        this.renderLayers();
      }
    });

    nameElement.replaceWith(input);
    input.focus();
    input.select();
  }

  render() {
    this.innerHTML = `
      <div class="layer-sidebar">
        <h2 class="section-title">레이어</h2>
        <div class="layer-list"></div>
      </div>
    `;
    this.renderLayers();
  }

  renderLayers() {
    const layerList = this.querySelector('.layer-list');
    if (!layerList) return;

    layerList.innerHTML = this.layers
      .map(
        (layer) => `
        <div class="layer-item" draggable="true" data-id="${layer.id}">
          <span class="layer-name">${layer.name}</span>
          <span class="layer-coords">(${Math.round(layer.x)}, ${Math.round(layer.y)})</span>
        </div>
      `
      )
      .join('');
  }
}

customElements.define('canvas-layer-manage', CanvasLayerManage);
