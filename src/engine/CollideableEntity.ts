import { ICollisionBox, IGameData } from "./configuration/interfaces";
import { Entity } from "./Entity";

export class CollideableEntity extends Entity {
  public update({ canvasWidth }: IGameData, delta: number) {
    this.onCollideCanvas(canvasWidth);
  }

  public getCollisionBox(): ICollisionBox {
    return {
      pos: this.pos,
      width: this.width,
      height: this.height,
    };
  }

  public drawCollisionBox(ctx: CanvasRenderingContext2D) {
    const box = this.getCollisionBox();

    ctx.fillStyle = this.color;

    if (box.width && box.height) {
      ctx.strokeRect(box.pos.x, box.pos.y, box.width, box.height);
    } else if (box.radius) {
      ctx.beginPath();
      ctx.arc(box.pos.x, box.pos.y, box.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.stroke();
      ctx.closePath();
    }
  }

  protected onCollideCanvas(canvasWidth: number) {
    const box = this.getCollisionBox();

    if (box.pos.x + box.width! >= canvasWidth) {
      box.pos.x = canvasWidth - box.width!;
    } else if (box.pos.x <= 0) {
      box.pos.x = 0;
    }
  }
}
