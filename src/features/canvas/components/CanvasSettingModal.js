import { eventBus } from '@/core/EventBus.js';

export default class CanvasSettingModal extends HTMLElement {
  constructor() {
    super();
    this.width = 500;
    this.height = 500;
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <h2>캔버스 크기 설정</h2>
          <div class="modal-input-group">
            <label>
              가로:
              <input type="number" id="canvas-width" value="${this.width}" min="100" max="2000">
            </label>
          </div>
          <div class="modal-input-group">
            <label>
              세로:
              <input type="number" id="canvas-height" value="${this.height}" min="100" max="2000">
            </label>
          </div>
          <button id="create-canvas">생성하기</button>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const createButton = this.querySelector('#create-canvas');
    createButton.addEventListener('click', () => {
      const width = parseInt(this.querySelector('#canvas-width').value);
      const height = parseInt(this.querySelector('#canvas-height').value);

      if (width > 2000 || height > 2000) {
        alert('캔버스 크기는 2000px를 초과할 수 없습니다.');
        return;
      }

      eventBus.emit('CANVAS_CREATED', { width, height });
      this.remove();
    });
  }
}

customElements.define('canvas-setting-modal', CanvasSettingModal);
