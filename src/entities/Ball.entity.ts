import { Vec2 } from "./../engine/math/Vec2";
import { CanvasConfig } from "../engine/configuration/enums";
import { ICollisionBox, IGameData } from "../engine/configuration/interfaces";
import { CollideableEntity } from "../engine/index";

export class Ball extends CollideableEntity {
  private speed: number = 0.6;
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

  public getCollisionBox(): ICollisionBox {
    return {
      pos: this.pos,
      radius: this.radius + 2,
    };
  }

  protected onCollideCanvas() {
    const box = this.getCollisionBox();

    if (
      box.pos.x > CanvasConfig.width - box.radius! ||
      box.pos.x - box.radius! < 0
    ) {
      this.vel.reverseX();
    } else if (
      box.pos.y - box.radius! < 0 ||
      box.pos.y + box.radius! > CanvasConfig.height
    ) {
      this.vel.reverseY();
    }
  }
}
