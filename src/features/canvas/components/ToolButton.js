export default class ToolButton extends HTMLElement {
  static get observedAttributes() {
    return ['icon-path', 'label'];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const iconPath = this.getAttribute('icon-path') || '';
    const label = this.getAttribute('label') || '';

    this.innerHTML = `
      <button class="tool-button">
        <svg class="tool-icon" viewBox="0 0 24 24">
          ${iconPath}
        </svg>
        ${label}
      </button>
    `;
  }

  addEventListeners() {
    const button = this.querySelector('.tool-button');
    button.addEventListener('click', () => {
      const event = new CustomEvent('tool-selected', {
        bubbles: true,
        detail: {
          tool: this.getAttribute('label'),
        },
      });
      this.dispatchEvent(event);
    });
  }
}

customElements.define('tool-button', ToolButton);
