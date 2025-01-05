import { eventBus } from '../../../core/EventBus';

export default class PropertyInput extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'type', 'placeholder', 'min', 'max', 'value'];
  }

  connectedCallback() {
    this.render();

    this.handleChange = this.handleChange.bind(this);
    this.addEventListener('change', this.handleChange);
  }
  handleChange(e) {
    const label = this.getAttribute('label');
    const value = e.target.value;

    const EVENT_MAP = {
      가로: {
        event: 'WIDTH_CHANGED',
        transform: (value) => ({ width: Number(value) }),
      },
      세로: {
        event: 'HEIGHT_CHANGED',
        transform: (value) => ({ height: Number(value) }),
      },
      색상: {
        event: 'COLOR_CHANGED',
        transform: (value) => ({ color: value }),
      },
      투명도: {
        event: 'OPACITY_CHANGED',
        transform: (value) => ({ opacity: Number(value) / 100 }),
      },
      텍스트: {
        event: 'TEXT_CHANGED',
        transform: (value) => ({ text: value }),
      },
    };
    const eventConfig = EVENT_MAP[label];
    if (eventConfig) {
      eventBus.emit(eventConfig.event, eventConfig.transform(value));
    }
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
