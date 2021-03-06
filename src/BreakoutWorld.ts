import { CanvasConfig } from "./engine/configuration/enums";
import { World } from "./engine/World";
import { Brick } from "./entities/Brick.entity";

export class BreakoutWorld extends World {
  public setup() {
    this.generateWorld();
  }

  private generateWorld() {
    this.width = CanvasConfig.width - this.margin * 2;

    const wallWidth = this.padding + 40;
    const maxWalls = Math.floor(this.width / wallWidth);

    let rowIndex = 1;

    [...new Array(maxWalls * this.rows)].forEach((_, index) => {
      if (index % maxWalls === 0) {
        rowIndex += 1;
      }

      const posX = this.getNextXPos(wallWidth, maxWalls) + wallWidth;

      const brick = new Brick({
        color: "blue",
        x: posX,
        y: rowIndex * 30,
      });

      this.bricks.push(brick);
    });
  }

  private getNextXPos(wallWidth: number, maxWalls: number) {
    const length = this.bricks.length;

    if (length <= 0) return this.margin - wallWidth;

    if (length % maxWalls === 0) {
      return this.margin - wallWidth;
    }

    return this.bricks[length - 1].pos.x;
  }
}
