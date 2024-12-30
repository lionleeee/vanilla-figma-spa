import { layerService } from '../services/LayerService.js';

export default class CanvasLayerSidebar extends HTMLElement {
  constructor() {
    super();
    this.layers = [];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.initDragAndDrop();
  }

  initDragAndDrop() {
    //이전 타겟 저장 변수
    let previousTarget = null;

    //1.드래그 시작
    this.addEventListener('dragstart', (e) => {
      const layerItem = e.target.closest('.layer-item');

      if (layerItem) {
        //1-1. 데이터 저장
        e.dataTransfer.setData('text/plain', layerItem.dataset.id);
        layerItem.classList.add('dragging');
      }
    });

    //2.드래그 오버
    this.addEventListener('dragover', (e) => {
      e.preventDefault();
      const targetItem = e.target.closest('.layer-item');

      //2-1 타겟이 동일 할 경우
      if (targetItem === previousTarget) return;

      //2-2. 이전 타겟 클래스 제거
      if (previousTarget) {
        previousTarget.classList.remove('drop-above', 'drop-below');
      }

      //2-3. 타겟이 없을 경우
      if (!targetItem) return;

      //2-4. 현재 드래그 위치 계산
      const targetArea = targetItem.getBoundingClientRect();
      const middleY = targetArea.top + targetArea.height / 2;
      const isAbove = e.clientY < middleY;

      //2-5. 타겟 클래스 추가, 타겟 갱신
      targetItem.classList.add(isAbove ? 'drop-above' : 'drop-below');
      previousTarget = targetItem;
    });

    //3.드래그 드롭
    this.addEventListener('drop', (e) => {
      e.preventDefault();

      //3-1. 드래그 중인 요소의 클래스 제거
      const draggingItem = document.querySelector('.dragging');
      if (draggingItem) {
        draggingItem.classList.remove('dragging');
      }

      // 이전 타겟의 클래스 제거
      if (previousTarget) {
        previousTarget.classList.remove('drop-above', 'drop-below');
      }

      //3-2. TODO : 타겟 이동

      previousTarget = null; // 이전 타겟 초기화
    });

    // 드래그 종료 시 클래스 정리
    this.addEventListener('dragend', () => {
      const draggingItem = document.querySelector('.dragging');
      if (draggingItem) {
        draggingItem.classList.remove('dragging');
      }
      if (previousTarget) {
        previousTarget.classList.remove('drop-above', 'drop-below');
        previousTarget = null;
      }
    });
  }

  addEventListeners() {
    document.addEventListener('layers-updated', (e) => {
      this.layers = e.detail.layers;
      this.renderLayers();
    });

    this.addEventListener('click', (e) => {
      const layerName = e.target.closest('.layer-name');
      if (layerName) {
        const layerItem = layerName.closest('.layer-item');
        const id = Number(layerItem.dataset.id);
        this.startEditing(layerName, id);
      }
    });
  }

  startEditing(nameElement, layerId) {
    const currentName = nameElement.textContent;
    const input = document.createElement('input');
    input.value = currentName;
    input.className = 'layer-name-input';

    const finishEditing = () => {
      const newName = input.value.trim();
      if (newName && newName !== currentName) {
        layerService.updateLayerName(layerId, newName);
      } else {
        this.renderLayers();
      }
    };

    input.addEventListener('blur', finishEditing);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        finishEditing();
      } else if (e.key === 'Escape') {
        this.renderLayers();
      }
    });

    nameElement.replaceWith(input);
    input.focus();
    input.select();
  }

  render() {
    this.innerHTML = `
      <div class="layer-sidebar">
        <h2 class="section-title">레이어</h2>
        <div class="layer-list"></div>
      </div>
    `;
    this.renderLayers();
  }

  renderLayers() {
    const layerList = this.querySelector('.layer-list');
    if (!layerList) return;

    layerList.innerHTML = this.layers
      .map(
        (layer) => `
        <div class="layer-item" draggable="true" data-id="${layer.id}">
          <span class="layer-name">${layer.name}</span>
          <span class="layer-coords">(${Math.round(layer.x)}, ${Math.round(layer.y)})</span>
        </div>
      `
      )
      .join('');
  }
}

customElements.define('canvas-layer-sidebar', CanvasLayerSidebar);
