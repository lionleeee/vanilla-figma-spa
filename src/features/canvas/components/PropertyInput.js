import { eventBus } from '../../../core/EventBus';

export default class PropertyInput extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'type',
      'placeholder',
      'min',
      'max',
      'value',
      'data-property-type',
    ];
  }

  connectedCallback() {
    this.render();

    this.handleChange = this.handleChange.bind(this);
    this.addEventListener('change', this.handleChange);
  }
  handleChange(e) {
    const propertyType = this.getAttribute('data-property-type');
    const value = e.target.value;
    const propertyValue = this.#getPropertyTypeValue(propertyType, value);
    eventBus.emit(`${propertyType.toUpperCase()}_CHANGED`, {
      [propertyType]: propertyValue,
    });
  }

  #getPropertyTypeValue(propertyType, value) {
    if (propertyType === 'color') {
      return value;
    }

    if (propertyType === 'opacity') {
      return Number(value) / 100;
    }
    if (propertyType === 'text') {
      return value;
    }

    return Number(value);
  }

  render() {
    const attrs = {
      label: this.getAttribute('label') || '',
      type: this.getAttribute('type') || 'text',
      placeholder: this.getAttribute('placeholder') || '',
      min: this.getAttribute('min') || 0,
      max: this.getAttribute('max') || 100,
      value: this.getAttribute('value') || 100,
    };

    const inputTemplates = {
      range: () => `
        <input 
          type="range" 
          class="range-slider" 
          min="${attrs.min}" 
          max="${attrs.max}" 
          value="${attrs.value}"
        />
      `,
      color: () => `
        <input 
          type="color" 
          class="color-picker" 
          value="${attrs.value}"
        />
      `,
      default: () => `
        <input 
          type="${attrs.type}" 
          class="input-field" 
          value="${attrs.value}"
          placeholder="${attrs.placeholder}"
        />
      `,
    };

    const getInputElement = () =>
      (inputTemplates[attrs.type] || inputTemplates.default)();

    this.innerHTML = `
      <div class="property-input">
        <label class="input-label">${attrs.label}</label>
        ${getInputElement()}
      </div>
    `;
  }
}

customElements.define('property-input', PropertyInput);
