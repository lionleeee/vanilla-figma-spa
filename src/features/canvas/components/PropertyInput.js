import { eventBus } from '../../../core/EventBus';

export default class PropertyInput extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'type', 'placeholder', 'min', 'max', 'value'];
  }

  connectedCallback() {
    this.render();

    this.handleChange = this.handleChange.bind(this);
    this.addEventListener('change', this.handleChange.bind(this));
  }
  handleChange(e) {
    const label = this.getAttribute('label');
    const value = e.target.value;

    switch (label) {
      case '가로':
        eventBus.emit('WIDTH_CHANGED', { width: Number(value) });
        break;
      case '세로':
        eventBus.emit('HEIGHT_CHANGED', { height: Number(value) });
        break;
      case '색상':
        eventBus.emit('COLOR_CHANGED', { color: value });
        break;
      case '투명도':
        eventBus.emit('OPACITY_CHANGED', { opacity: Number(value) / 100 });
        break;
    }
  }

  render() {
    const label = this.getAttribute('label') || '';
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const min = this.getAttribute('min') || 0;
    const max = this.getAttribute('max') || 100;
    const value = this.getAttribute('value') || 100;

    let inputElement = ``;

    if (type === 'range') {
      inputElement = `
        <input 
          type="range" 
          class="range-slider" 
          min="${min}" 
          max="${max}" 
          value="${value}"
        />
      `;
    } else if (type === 'color') {
      inputElement = `
        <input 
          type="color" 
          class="color-picker" 
          value="${value}"
        />
      `;
    } else {
      inputElement = `
        <input 
          type="${type}" 
          class="input-field" 
          value="${value}"
          placeholder="${placeholder}"
        />
      `;
    }

    this.innerHTML = `
      <div class="property-input">
        <label class="input-label">${label}</label>
        ${inputElement}
      </div>
    `;
  }
}

customElements.define('property-input', PropertyInput);
