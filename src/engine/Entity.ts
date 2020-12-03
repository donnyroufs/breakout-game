import { v4 } from "uuid";
import {
  CollisionDir,
  CollisionType,
  CanvasConfig,
} from "./configuration/enums";
import {
  ICollisionData,
  IEntity,
  IEntityOptions,
  IGameData,
} from "./configuration/interfaces";

export class Entity implements IEntity {
  public id: string = v4();
  public x: number;
  public y: number;
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
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  update({}: IGameData, delta: number) {
    this.onCollideCanvas();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  public setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  protected onCollideCanvas() {
    if (this.x + this.width >= CanvasConfig.width) {
      this.x = CanvasConfig.width - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }
  }
}
