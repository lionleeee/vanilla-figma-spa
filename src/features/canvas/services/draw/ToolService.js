export class ToolService {
  constructor() {
    this.currentTool = null;
    this.subscribers = new Set();
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document.addEventListener('tool-selected', (e) => {
      this.setTool(e.detail.tool);
    });
  }

  setTool(toolName) {
    this.currentTool = toolName;
  }

  getCurrentTool() {
    return this.currentTool;
  }
}

export const toolService = new ToolService();
