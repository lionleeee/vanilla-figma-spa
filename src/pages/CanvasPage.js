import '../features/canvas/components/CanvasLayerSidebar.js';
import '../features/canvas/components/CanvasToolsSidebar.js';
import '../features/canvas/components/CanvasArea.js';
export default class CanvasPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container">
        <canvas-layer-sidebar></canvas-layer-sidebar>
          <canvas-area></canvas-area>
        <canvas-tools-sidebar></canvas-tools-sidebar>
      </div>
    `;
  }
}

customElements.define('canvas-page', CanvasPage);
