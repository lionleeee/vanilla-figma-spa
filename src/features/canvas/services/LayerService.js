class LayerService {
  static instance = null;

  constructor() {
    if (LayerService.instance) {
      return LayerService.instance;
    }
    LayerService.instance = this;
    this.currentZIndex = 0;
    this.layers = [];
    this.counters = {
      rectangle: 0,
      circle: 0,
      line: 0,
      text: 0,
    };
  }

  addLayer(type, x, y) {
    console.log(type, x, y);
    this.counters[type]++;
    const layer = {
      id: Date.now(),
      name: `${type} ${this.counters[type]}`,
      type,
      x,
      y,
      z: ++this.currentZIndex,
    };
    this.layers.unshift(layer);
    this.notifyLayerUpdate();
    return layer;
  }

  changeLayerZIndex(droppedId, targetElm, isAbove) {
    const targetId = Number(targetElm.dataset.id);
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
