import { eventBus } from '@/core/event/EventBus.js';
import { EVENTS } from '../../../core/event/Events';

class LayerService {
  static instance = null;

  constructor() {
    if (LayerService.instance) {
      return LayerService.instance;
    }
    LayerService.instance = this;
    this.currentZIndex = 0;
    this.layers = [];
  }

  addLayer(id, type, ...params) {
    const [x, y, width, height, radius = 0, properties] = params;
    const layer = {
      id: id,
      name: `${type} ${id}`,
      type,
      x,
      y,
      z: ++this.currentZIndex,
      width,
      height,
      radius,
      properties,
    };

    this.layers.unshift(layer);

    this.emitLayerUpdate();
    return layer;
  }
  clearLayers() {
    this.layers = [];
    this.currentId = 0;
    this.emitLayerUpdate();
  }

  changeLayerZIndex(droppedId, targetId, isAbove) {
    targetId = Number(targetId);
    droppedId = Number(droppedId);

    const targetLayer = this.layers.find((layer) => layer.id === targetId);
    const droppedLayer = this.layers.find((layer) => layer.id === droppedId);

    if (!targetLayer || !droppedLayer) return;

    this.layers = this.layers.filter((layer) => layer.id !== droppedId);

    const targetIndex = this.layers.findIndex((layer) => layer.id === targetId);

    if (targetIndex === -1) {
      // 맨 위로 드롭
      if (isAbove) {
        this.layers.unshift(droppedLayer);
      }
      // 맨 아래로 드롭
      else {
        this.layers.push(droppedLayer);
      }
    } else {
      const insertIndex = isAbove ? targetIndex : targetIndex + 1;
      this.layers.splice(insertIndex, 0, droppedLayer);
    }

    this.updateZIndices();
    this.emitLayerUpdate();

    this.emitLayerRedraw();
  }

  updateZIndices() {
    this.layers.forEach((layer, index) => {
      layer.z = this.layers.length - index;
    });
  }

  updateLayerName(id, newName) {
    const layer = this.layers.find((layer) => layer.id === id);
    if (layer) {
      layer.name = newName;
      this.emitLayerUpdate();
    }
  }

  emitLayerUpdate() {
    eventBus.emit(EVENTS.LAYER.UPDATED, {
      layers: this.layers,
    });
  }
  emitLayerRedraw() {
    eventBus.emit(EVENTS.LAYER.REORDERED, {
      layers: this.layers,
    });
  }

  getLayers() {
    return this.layers;
  }

  importLayers(layers) {
    this.layers = layers;
    this.emitLayerUpdate();
    this.emitLayerRedraw();
  }
}

export const layerService = new LayerService();
