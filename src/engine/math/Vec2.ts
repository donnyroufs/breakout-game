export class Vec2 {
  constructor(public x: number, public y: number) {}

  add(vector: Vec2) {
    this.x = vector.x;
    this.y = vector.y;
  }

  dist(vector: Vec2) {
    const xDist = vector.x - this.x;
    const yDist = vector.y - this.y;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }
}
