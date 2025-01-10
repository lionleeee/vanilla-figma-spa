import { eventBus } from '@/core/event/EventBus.js';
import { EVENTS } from '../../../core/event/Events';

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
      this.handleToolDeselect(buttonElement);
      return;
    }

    this.deselectAllTools();
    this.handleToolActivate(buttonElement, toolName);
  }

  handleToolDeselect(buttonElement) {
    this.isSelected = false;
    buttonElement.classList.remove('selected');
    this.emitToolUpdate(null);
  }

  handleToolActivate(buttonElement, toolName) {
    this.isSelected = true;
    buttonElement.classList.add('selected');
    this.emitToolUpdate(toolName);

  }

  deselectAllTools() {
    document.querySelectorAll('tool-button').forEach((button) => {
      button.isSelected = false;
      button.querySelector('.tool-button')?.classList.remove('selected');
    });
  }

  emitToolUpdate(tool) {
    eventBus.emit(EVENTS.TOOL.SELECTED, { tool });
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
