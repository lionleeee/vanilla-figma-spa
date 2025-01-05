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
    const toolNameMap = {
      사각형: 'rectangle',
      원형: 'circle',
      직선: 'line',
      텍스트: 'text',
    };
    const koreanLabel = this.getAttribute('label');
    const toolName = toolNameMap[koreanLabel] || koreanLabel;

    if (this.isSelected) {
      this.isSelected = false;
      this.querySelector('.tool-button').classList.remove('selected');
      eventBus.emit('TOOL_SELECTED', { tool: null });
    } else {
      document.querySelectorAll('tool-button').forEach((button) => {
        button.isSelected = false;
        button.querySelector('.tool-button').classList.remove('selected');
      });
      this.querySelector('.tool-button').classList.add('selected');
      this.isSelected = true;
      eventBus.emit('TOOL_SELECTED', { tool: toolName });
    }
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
