import { Vec2 } from "./math/Vec2";
import { IEntity, IEntityOptions, IGameData } from "./configuration/interfaces";

export class Entity implements IEntity {
  public pos: Vec2;
  public width: number;
  public height: number;
  public radius: number;
  public color: string;

  constructor({
    x = 0,
    y = 0,
    width = 50,
    height = 50,
    radius,
    color = "red",
  }: IEntityOptions) {
    this.pos = new Vec2(x, y);
    this.width = width;
    this.height = height;
    this.radius = radius || this.getRadius(height, width);
    this.color = color;
  }

  public update({}: IGameData, delta: number) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  public setPos(x: number, y: number) {
    this.pos = new Vec2(x, y);
  }

  private getRadius(height: number, width: number) {
    if (height === width) {
      return height / 2;
    }

    return 0;
  }
}
