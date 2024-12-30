export class ShapeDimensionCalculator {
  static calculateRectangle(start, end) {
    return {
      width: end.x - start.x,
      height: end.y - start.y,
    };
  }

  static calculateCircle(start, end) {
    const width = end.x - start.x;
    const height = end.y - start.y;
    return {
      radius: Math.sqrt(width * width + height * height) / 2,
    };
  }
}
