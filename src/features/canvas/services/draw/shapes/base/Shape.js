export default class Shape {
  constructor(context, x, y, id) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.id = id;
  }
  getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 20) + 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  draw() {}

  preview() {}

  getLayerInfo() {}
}
