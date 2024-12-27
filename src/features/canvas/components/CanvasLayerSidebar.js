export default class CanvasLayerSidebar extends HTMLElement {
  constructor() {
    super();
    this.layers = [];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('layers-updated', (e) => {
      this.layers = e.detail.layers;
      this.renderLayers();
    });
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
        <div class="layer-item" data-id="${layer.id}">
          <span class="layer-name">${layer.name}</span>
          <span class="layer-coords">(${Math.round(layer.x)}, ${Math.round(layer.y)})</span>
        </div>
      `
      )
      .join('');
  }
}

customElements.define('canvas-layer-sidebar', CanvasLayerSidebar);
