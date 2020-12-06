import { Vec2 } from "./math/Vec2";
import { IEntity, IEntityOptions, IGameData } from "./configuration/interfaces";

export class Entity implements IEntity {
  public pos: Vec2;
  public width: number;
  public height: number;
  public color: string;

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

  public update({}: IGameData, delta: number) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  public setPos(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }
}
