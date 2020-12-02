import { CollisionType } from "../engine/configuration/enums";
import { IGameData, ICollisionData } from "../engine/configuration/interfaces";
import { Entity } from "../engine/Entity";

export class Ball extends Entity {
  private radius: number = 10;
  private velX: number = 0;
  private velY: number = 0;
  private speed: number = 200;

  public width: number = this.radius * 2;

  update(gameData: IGameData, delta: number) {
    this.velX = this.speed * delta;
    this.velY = -(this.speed * delta);

    this.x += this.velX;
    this.y += this.velY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  handleCollision({ type, dir }: ICollisionData, delta: number) {
    if (type === CollisionType.canvas) {
    }
  }
}
