import './Header.js';
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

      <footer>푸터</footer>
    `;
  }
}

customElements.define('app-layout', Layout);
