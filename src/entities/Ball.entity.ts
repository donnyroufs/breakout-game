import { CanvasConfig } from "../engine/configuration/enums";
import { CollisionDir, CollisionType } from "../engine/configuration/enums";
import { IGameData, ICollisionData } from "../engine/configuration/interfaces";
import { Entity } from "../engine/Entity";

export class Ball extends Entity {
  private radius: number = 10;
  private speed: number = 300;
  private dx: number = this.speed;
  private dy: number = -this.speed;

  public hasCollision: boolean = false;
  public width: number = this.radius * 2;

  update(gameData: IGameData, delta: number) {
    this.onCollideCanvas();

    this.x += this.dx * delta;
    this.y += this.dy * delta;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  protected onCollideCanvas() {
    if (
      this.x + this.radius > CanvasConfig.width - this.radius ||
      this.x - this.radius < this.radius
    ) {
      this.dx = -this.dx;
    } else if (
      this.y - this.radius < 0 ||
      this.y + this.radius > CanvasConfig.height
    ) {
      this.dy = -this.dy;
    }
  }
}
