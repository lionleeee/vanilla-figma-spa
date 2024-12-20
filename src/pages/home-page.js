export default class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>홈입니다</h1>
      </div>
    `;
  }
}
customElements.define('home-page', HomePage);
