class LayerService {
  static instance = null;

  constructor() {
    if (LayerService.instance) {
      return LayerService.instance;
    }
    LayerService.instance = this;

    this.layers = [];
    this.counters = {
      사각형: 0,
      원형: 0,
      직선: 0,
      텍스트: 0,
    };
  }

  addLayer(type, x, y) {
    this.counters[type]++;
    const layer = {
      id: Date.now(),
      name: `${type} ${this.counters[type]}`,
      type,
      x,
      y,
    };
    this.layers.unshift(layer);
    this.notifyLayerUpdate();
    return layer;
  }

  notifyLayerUpdate() {
    document.dispatchEvent(
      new CustomEvent('layers-updated', {
        detail: { layers: this.layers },
      })
    );
  }

  static getInstance() {
    if (!LayerService.instance) {
      LayerService.instance = new LayerService();
    }
    return LayerService.instance;
  }
}

export const layerService = LayerService.getInstance();
