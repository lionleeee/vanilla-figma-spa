import './Header.js';
import './Footer.js';
import '../../core/router/RouterOutlet.js';

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
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    `;
  }
}

customElements.define('app-layout', Layout);
