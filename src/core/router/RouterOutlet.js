export default class RouterOutlet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';
  }
}

customElements.define('router-outlet', RouterOutlet);
