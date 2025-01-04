import { eventBus } from '@/core/EventBus.js';

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
    console.log(layer);
    this.notifyLayerUpdate();
    return layer;
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
    this.notifyLayerUpdate();

    eventBus.emit('LAYERS_REORDERED', {
      layers: this.layers,
    });
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
      this.notifyLayerUpdate();
    }
  }

  notifyLayerUpdate() {
    document.dispatchEvent(
      new CustomEvent('layers-updated', {
        detail: { layers: this.layers },
      })
    );
  }
}

export const layerService = new LayerService();
