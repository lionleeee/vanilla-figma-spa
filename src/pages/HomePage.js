import './components/LayerSidebar.js';
export default class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container">

      <app-layer-sidebar></app-layer-sidebar>
      캔버스 영역
      </div>
    `;
  }
}
customElements.define('home-page', HomePage);
