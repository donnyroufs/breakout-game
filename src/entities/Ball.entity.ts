import { Vec2 } from "./../engine/math/Vec2";
import { CanvasConfig } from "../engine/configuration/enums";
import { IGameData } from "../engine/configuration/interfaces";
import { CollideableEntity } from "../engine/index";

export class Ball extends CollideableEntity {
  private radius: number = 10;
  private speed: number = 15;
  private vel: Vec2 = new Vec2(this.speed, -this.speed);

  update({}: IGameData, delta: number) {
    this.onCollideCanvas();

    const clonedVel = this.vel.clone();

    clonedVel.mult(delta * this.speed);
    this.pos.add(clonedVel);
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
      this.pos.x > CanvasConfig.width - this.radius ||
      this.pos.x - this.radius < 0
    ) {
      this.vel.reverseX();
    } else if (
      this.pos.y - this.radius < 0 ||
      this.pos.y + this.radius > CanvasConfig.height
    ) {
      this.vel.reverseY();
    }
  }
}
