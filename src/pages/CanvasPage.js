import '../features/canvas/components/CanvasLayerManage.js';
import '../features/canvas/components/CanvasToolsSidebar.js';
import '../features/canvas/components/CanvasArea.js';
export default class CanvasPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container">
        <canvas-layer-manage></canvas-layer-manage>
          <canvas-area></canvas-area>
        <canvas-tools-sidebar></canvas-tools-sidebar>
      </div>
    `;
  }
}

customElements.define('canvas-page', CanvasPage);
