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
