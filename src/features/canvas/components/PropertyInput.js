export default class PropertyInput extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'type', 'placeholder', 'min', 'max', 'value'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute('label') || '';
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';

    let inputElement = `
    <input 
      type="${type}" 
      class="input-field" 
      placeholder="${placeholder}"
    />
  `;

    this.innerHTML = `
      <div class="property-input">
        <label class="input-label">${label}</label>
        ${inputElement}
      </div>
    `;
  }
}

customElements.define('property-input', PropertyInput);
