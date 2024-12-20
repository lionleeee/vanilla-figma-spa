export default class ToolsSideBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `

    <div class="tools-sidebar">
    <div class="property-group">
      <h2 class="section-title">도형</h2>
      <button class="tool-button">
        <svg class="tool-icon" viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        사각형
      </button>
      <button class="tool-button">
        <svg class="tool-icon" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        원형
      </button>
      <button class="tool-button">
        <svg class="tool-icon" viewBox="0 0 24 24">
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        직선
      </button>
      <button class="tool-button">
        <svg class="tool-icon" viewBox="0 0 24 24">
          <text x="6" y="16" font-size="14">T</text>
        </svg>
        텍스트
      </button>
    </div>

    <div class="property-group">
      <h2 class="section-title">설정</h2>
      <label class="input-label">가로</label>
      <input type="number" class="input-field" placeholder="Width" />

      <label class="input-label">세로</label>
      <input type="number" class="input-field" placeholder="Height" />

      <label class="input-label">투명도</label>
      <input
        type="range"
        class="range-slider"
        min="0"
        max="100"
        value="100"
      />
    </div>

    <button class="reset-button">초기화</button>
  </div>
    `;
  }
}

customElements.define('app-tools-sidebar', ToolsSideBar);
