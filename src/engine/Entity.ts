import { Vec2 } from "./math/Vec2";
import { CanvasConfig } from "./configuration/enums";
import { IEntity, IEntityOptions, IGameData } from "./configuration/interfaces";

export class Entity implements IEntity {
  public pos: Vec2;
  public width: number;
  public height: number;
  public color: string;

  public hasCollision: boolean = false;

  constructor({
    x = 0,
    y = 0,
    width = 50,
    height = 50,
    color = "red",
  }: IEntityOptions) {
    this.pos = new Vec2(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
  }

  update({}: IGameData, delta: number) {
    this.onCollideCanvas();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  public setPos(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }

  protected onCollideCanvas() {
    if (this.pos.x + this.width >= CanvasConfig.width) {
      this.pos.x = CanvasConfig.width - this.width;
    } else if (this.pos.x <= 0) {
      this.pos.x = 0;
    }
  }
}
