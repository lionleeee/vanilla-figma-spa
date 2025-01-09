import { eventBus } from '@/core/event/EventBus.js';

export function initDragAndDrop(element) {
  let draggedItem = null;
  let previousTarget = null;
  let dropPosition = null;

  element.addEventListener('dragstart', (e) => {
    const layerItem = e.target.closest('.layer-item');
    if (!layerItem) return;

    e.dataTransfer.setData('text/plain', layerItem.dataset.id);
    layerItem.classList.add('dragging');
    draggedItem = layerItem;
  });

  element.addEventListener('dragover', (e) => {
    e.preventDefault();
    const targetItem = e.target.closest('.layer-item');
    const layerList = element.querySelector('.layer-list');

    if (!shouldHandleDragOver(targetItem, draggedItem, previousTarget)) return;

    clearPreviousDropStyles(previousTarget);

    if (!targetItem) {
      handleEdgeCases(e, layerList);
      return;
    }

    updateDropIndicator(e, targetItem);
  });

  element.addEventListener('drop', (e) => {
    e.preventDefault();

    if (!previousTarget) {
      clearDragState();
      return;
    }

    eventBus.emit('LAYER_DROPPED', {
      droppedId: draggedItem.dataset.id,
      targetId: previousTarget.dataset.id,
      isAbove: dropPosition,
    });
    clearDragState();
  });

  function shouldHandleDragOver(target, dragged, previous) {
    return !(target === previous || target === dragged);
  }

  function clearPreviousDropStyles(target) {
    if (!target) return;
    target.classList.remove('drop-above', 'drop-below');
  }

  function updateDropIndicator(e, target) {
    const targetRect = target.getBoundingClientRect();
    const isAbove = e.clientY < targetRect.top + targetRect.height / 2;

    target.classList.add(isAbove ? 'drop-above' : 'drop-below');
    previousTarget = target;
    dropPosition = isAbove;
  }

  function handleEdgeCases(e, list) {
    const firstItem = list.firstElementChild;
    const lastItem = list.lastElementChild;

    if (isAboveFirstItem(e, firstItem)) {
      firstItem.classList.add('drop-above');
      previousTarget = firstItem;
      dropPosition = true;
    } else if (isBelowLastItem(e, lastItem)) {
      lastItem.classList.add('drop-below');
      previousTarget = lastItem;
      dropPosition = false;
    }
  }

  function isAboveFirstItem(e, item) {
    if (!item) return false;
    const rect = item.getBoundingClientRect();
    return e.clientY < rect.top + rect.height / 2;
  }

  function isBelowLastItem(e, item) {
    if (!item) return false;
    const rect = item.getBoundingClientRect();
    return e.clientY > rect.top + rect.height / 2;
  }

  function clearDragState() {
    if (draggedItem) {
      draggedItem.classList.remove('dragging');
    }
    clearPreviousDropStyles(previousTarget);
    draggedItem = null;
    previousTarget = null;
    dropPosition = null;
  }
}
