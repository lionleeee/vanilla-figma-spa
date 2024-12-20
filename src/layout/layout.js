export default class Layout extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <header>
        <nav>
          <a href="/" data-link>홈</a>
        </nav>
      </header>
      <main>
        레이아웃
      </main>
      <footer>
        <p>© 2024 SPA App</p>
      </footer>
    `;
  }
}

customElements.define('app-layout', Layout);
