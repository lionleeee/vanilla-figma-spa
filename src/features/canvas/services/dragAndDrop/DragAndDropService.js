import DragState from './DragState';
import DragStyleHandler from './DragStyleHandler';
import DragPositionCalculator from './DragPositionCalculator';

export default class DragAndDropService {
  constructor(container) {
    this.container = container;
    this.stateManager = new DragState();
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
    if (!layerItem) return;

    e.dataTransfer.setData('text/plain', layerItem.dataset.id);
    DragStyleHandler.addDraggingClass(layerItem);
    this.stateManager.setDraggingItem(layerItem);
  }

  handleDragOver(e) {
    e.preventDefault();
    const targetItem = e.target.closest('.layer-item');
    const layerList = this.container.querySelector('.layer-list');

    if (this.shouldSkipDragOver(targetItem)) return;

    this.clearPreviousDroplocation();

    if (!targetItem) {
      this.handleEdgeDrop(e, layerList);
      return;
    }

    this.updateDropIndicator(e, targetItem);
  }

  shouldSkipDragOver(targetItem) {
    return (
      this.stateManager.isPreviousTarget(targetItem) ||
      this.stateManager.isDraggingItem(targetItem)
    );
  }

  clearPreviousDroplocation() {
    if (this.stateManager.previousTarget) {
      DragStyleHandler.removeDropLocation(this.stateManager.previousTarget);
    }
  }

  updateDropIndicator(e, targetItem) {
    const targetArea = targetItem.getBoundingClientRect();
    const isAbove = DragPositionCalculator.calculateDropPosition(e, targetArea);

    DragStyleHandler.addDropLocation(targetItem, isAbove);
    this.stateManager.setPreviousTarget(targetItem);
    this.stateManager.setDropPosition(isAbove);
  }

  handleEdgeDrop(e, layerList) {
    const firstItem = layerList.firstElementChild;
    const lastItem = layerList.lastElementChild;

    if (DragPositionCalculator.isAboveFirstItem(e, firstItem)) {
      DragStyleHandler.addDropLocation(firstItem, true);
      this.stateManager.setPreviousTarget(firstItem);
      this.stateManager.setDropPosition(true);
    } else if (DragPositionCalculator.isBelowLastItem(e, lastItem)) {
      DragStyleHandler.addDropLocation(lastItem, false);
      this.stateManager.setPreviousTarget(lastItem);
      this.stateManager.setDropPosition(false);
    }
  }

  handleDrop(e) {
    e.preventDefault();

    DragStyleHandler.removeDraggingClass(document.querySelector('.dragging'));
    this.clearPreviousDroplocation();

    this.dispatchDropEvent(e);
    this.stateManager.clearState();
  }

  handleDragEnd() {
    DragStyleHandler.removeDraggingClass(document.querySelector('.dragging'));
    this.clearPreviousDroplocation();
    this.stateManager.clearState();
  }

  dispatchDropEvent(e) {
    const dropEvent = new CustomEvent('layer-dropped', {
      detail: {
        target: this.stateManager.previousTarget,
        data: e.dataTransfer.getData('text/plain'),
        isAbove: this.stateManager.dropPosition,
      },
    });
    this.container.dispatchEvent(dropEvent);
  }
}
