import { layerService } from '../../features/canvas/services/LayerService';
import { binaryConverter } from '@/utils/binary/binaryConverter.js';

export default class Header extends HTMLElement {
  connectedCallback() {
    this.render();
    const buttonHandlers = {
      'download-button': this.handleDownload,
      'export-button': this.handleExport,
      'import-button': this.handleFileImport,
    };

    Object.entries(buttonHandlers).forEach(([id, handler]) => {
      this.querySelector(`#${id}`).addEventListener('click', handler);
    });
  }

  handleDownload = () => {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'canvas-drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  handleExport = () => {
    const layers = layerService.getLayers();
    const binaryData = binaryConverter.toBinary(layers);
    const blob = new Blob([binaryData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = 'canvas-layers.bin';
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  };

  handleFileImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.bin';
    input.style.display = 'none';

    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const buffer = await file.arrayBuffer();
        this.readFile(buffer);
      } catch (error) {
        alert('파일 불러오기를 실패했습니다. 다시 시도해주세요');
      }
    };

    input.click();
  };

  readFile = (buffer) => {
    const layers = binaryConverter.fromBinary(buffer);
    layerService.importLayers(layers);
  };

  render() {
    this.innerHTML = `
    <header class="header">
      <h1 class="header-title">Canvas</h1>
      <div class="button-group">
        <button class="header-button"id="export-button">내보내기</button>
        <button class="header-button" id="import-button">불러오기</button>
        <button class="header-button" id="download-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          다운로드
        </button>
 
      </div>
    </header>
    `;
  }
}

customElements.define('app-header', Header);
