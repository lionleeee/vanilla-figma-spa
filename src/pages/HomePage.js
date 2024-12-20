import './components/LayerSidebar.js';
import './components/ToolsSidebar.js';
export default class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container">

      <app-layer-sidebar></app-layer-sidebar>

      <!--캔버스 영역만 잡아놓음-->
      <div class="main-canvas">
        <div class="canvas-area">
        </div>
      </div>
      <app-tools-sidebar></app-tools-sidebar>
      </div>
    `;
  }
}
customElements.define('home-page', HomePage);
