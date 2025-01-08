import { eventBus } from '@/core/EventBus.js';

export default class ToolButton extends HTMLElement {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.isSelected = false;
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
    const buttonElement = this.querySelector('.tool-button');
    if (this.isSelected) {
      this.deselectTool(buttonElement);
      return;
    }

    this.deselectAllTools();
    this.selectTool(buttonElement, toolName);
  }

  deselectTool(buttonElement) {
    this.isSelected = false;
    buttonElement.classList.remove('selected');
    eventBus.emit('TOOL_SELECTED', { tool: null });
  }

  selectTool(buttonElement, toolName) {
    this.isSelected = true;
    buttonElement.classList.add('selected');
    eventBus.emit('TOOL_SELECTED', { tool: toolName });
  }

  deselectAllTools() {
    document.querySelectorAll('tool-button').forEach((button) => {
      button.isSelected = false;
      button.querySelector('.tool-button')?.classList.remove('selected');
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
