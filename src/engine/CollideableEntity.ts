import { IGameData } from "./configuration/interfaces";
import { Entity } from "./Entity";

export class CollideableEntity extends Entity {
  public update({ canvasWidth }: IGameData, delta: number) {
    this.onCollideCanvas(canvasWidth);
  }

  protected onCollideCanvas(canvasWidth: number) {
    if (this.pos.x + this.width >= canvasWidth) {
      this.pos.x = canvasWidth - this.width;
    } else if (this.pos.x <= 0) {
      this.pos.x = 0;
    }
  }
}
