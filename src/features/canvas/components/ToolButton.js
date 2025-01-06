import { eventBus } from '@/core/EventBus.js';

export default class ToolButton extends HTMLElement {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  handleClick() {
    const toolName = this.getAttribute('tool-name');
    eventBus.emit('TOOL_SELECTED', {
      tool: toolName,
    });
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
}

customElements.define('tool-button', ToolButton);
