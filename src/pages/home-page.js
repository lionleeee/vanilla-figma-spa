export default class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>홈</h1>
      </div>
    `;
  }
}
customElements.define('home-page', HomePage);
