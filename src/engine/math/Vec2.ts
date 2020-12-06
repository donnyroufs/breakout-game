export class Vec2 {
  constructor(public x: number, public y: number) {}

  add(vector: Vec2) {
    this.x += vector.x;
    this.y += vector.y;
  }

  sub(x: number = 0, y: number = 0) {
    this.x -= x;
    this.y -= y;
  }

  mult(times: number) {
    this.x *= times;
    this.y *= times;
  }

  dist(vector: Vec2) {
    const xDist = vector.x - this.x;
    const yDist = vector.y - this.y;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }

  reverse() {
    this.x = -this.x;
    this.y = -this.y;
  }

  reverseX() {
    this.x = -this.x;
  }

  reverseY() {
    this.y = -this.y;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }
}
