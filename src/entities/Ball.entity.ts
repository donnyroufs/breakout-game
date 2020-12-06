import { Paddle } from "./Paddle.entity";
import { CanvasConfig } from "../engine/configuration/enums";
import { IGameData } from "../engine/configuration/interfaces";
import { Entity } from "../engine/Entity";

export class Ball extends Entity {
  private radius: number = 10;
  private speed: number = 300;
  private dx: number = this.speed;
  private dy: number = -205;

  public hasCollision: boolean = false;
  public width: number = this.radius * 2;

  update({ entities }: IGameData, delta: number) {
    this.onCollideCanvas();

    entities.forEach((entity: Entity) => {
      if (this === entity) return;

      if (
        this.pos.x > entity.pos.x &&
        this.pos.x < entity.pos.x + entity.width &&
        this.pos.y > entity.pos.y &&
        this.pos.y < entity.pos.y + entity.height
      ) {
        this.dy = -this.dy;

        if (entity instanceof Paddle) {
          return;
        }

        // remove brick
        const index = entities.findIndex((obj) => obj === entity);
        entities.splice(index, 1);
      }
    });

    this.pos.x += this.dx * delta;
    this.pos.y += this.dy * delta;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  protected onCollideCanvas() {
    if (
      this.pos.x + this.radius > CanvasConfig.width - this.radius ||
      this.pos.x - this.radius < this.radius
    ) {
      this.dx = -this.dx;
    } else if (
      this.pos.y - this.radius < 0 ||
      this.pos.y + this.radius > CanvasConfig.height
    ) {
      this.dy = -this.dy;
    }
  }
}
