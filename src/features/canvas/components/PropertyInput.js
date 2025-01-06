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

    return Number(value);
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
