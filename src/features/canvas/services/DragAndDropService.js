export default class DragAndDropService {
  constructor(container) {
    this.container = container;
    this.previousTarget = null;

    this.initDragAndDrop();
  }

  initDragAndDrop() {
    this.container.addEventListener(
      'dragstart',
      this.handleDragStart.bind(this)
    );
    this.container.addEventListener('dragover', this.handleDragOver.bind(this));
    this.container.addEventListener('drop', this.handleDrop.bind(this));
    this.container.addEventListener('dragend', this.handleDragEnd.bind(this));
  }

  handleDragStart(e) {
    const layerItem = e.target.closest('.layer-item');
    if (layerItem) {
      e.dataTransfer.setData('text/plain', layerItem.dataset.id);
      layerItem.classList.add('dragging');
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    const targetItem = e.target.closest('.layer-item');
    const layerList = this.container.querySelector('.layer-list');
    const draggingItem = document.querySelector('.dragging');

    if (targetItem === this.previousTarget || targetItem === draggingItem)
      return;

    if (this.previousTarget) {
      this.previousTarget.classList.remove('drop-above', 'drop-below');
    }

    if (!targetItem) {
      this.handleEdgeDrop(e, layerList);
      return;
    }

    const targetArea = targetItem.getBoundingClientRect();
    const isAbove = e.clientY < targetArea.top + targetArea.height / 2;

    targetItem.classList.add(isAbove ? 'drop-above' : 'drop-below');
    this.previousTarget = targetItem;
  }

  handleEdgeDrop(e, layerList) {
    const firstItem = layerList.firstElementChild;
    const lastItem = layerList.lastElementChild;

    if (firstItem && e.clientY < firstItem.getBoundingClientRect().top) {
      firstItem.classList.add('drop-above');
      this.previousTarget = firstItem;
    } else if (
      lastItem &&
      e.clientY > lastItem.getBoundingClientRect().bottom
    ) {
      lastItem.classList.add('drop-below');
      this.previousTarget = lastItem;
    }
  }

  handleDrop(e) {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    if (draggingItem) {
      draggingItem.classList.remove('dragging');
    }
    if (this.previousTarget) {
      this.previousTarget.classList.remove('drop-above', 'drop-below');
    }

    const dropEvent = new CustomEvent('layer-dropped', {
      detail: {
        target: this.previousTarget,
        data: e.dataTransfer.getData('text/plain'),
      },
    });
    this.container.dispatchEvent(dropEvent);

    this.previousTarget = null;
  }

  handleDragEnd() {
    const draggingItem = document.querySelector('.dragging');
    if (draggingItem) {
      draggingItem.classList.remove('dragging');
    }
    if (this.previousTarget) {
      this.previousTarget.classList.remove('drop-above', 'drop-below');
      this.previousTarget = null;
    }
  }
}
