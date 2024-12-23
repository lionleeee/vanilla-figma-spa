import './Header.js';
import './Footer.js';
export default class Layout extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <app-header></app-header>
        <main></main>
      <app-footer></app-footer>
      
    `;
  }
}

customElements.define('app-layout', Layout);
