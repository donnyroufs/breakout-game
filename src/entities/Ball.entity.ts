import { Paddle } from "./Paddle.entity";
import { Brick } from "./Brick.entity";
import { Vec2 } from "./../engine/math/Vec2";
import { CanvasConfig } from "../engine/configuration/enums";
import { ICollisionBox, IGameData } from "../engine/configuration/interfaces";
import { CollideableEntity } from "../engine/index";

export class Ball extends CollideableEntity {
  private speed: number = 0.6;
  private vel: Vec2 = new Vec2(this.speed, -this.speed);
  private count: number = 0;

  update({ collideableEntities }: IGameData, delta: number) {
    this.onCollideCanvas();

    collideableEntities.forEach((entity) => {
      const collisionData = this.circleCollidesWithRect(this, entity);
      if (
        collisionData.collided &&
        (entity instanceof Brick || entity instanceof Paddle)
      ) {
        if (this.count === 0) {
          console.log(collisionData);
          this.count++;
        }

        const index = collideableEntities.findIndex(
          ({ id }) => id === entity.id
        );

        if (entity instanceof Brick) {
          collideableEntities.splice(index, 1);
        }
        if (
          collisionData.top ||
          (collisionData.bottom &&
            !(collisionData.left && !collisionData.right))
        ) {
          this.vel.reverseY();
        } else if (
          collisionData.left ||
          (collisionData.right && !collisionData.top && !collisionData.bottom)
        ) {
          this.vel.reverseX();
        }
      }
    });

    const clonedVel = this.vel.clone();
    clonedVel.mult(delta * this.speed);

    this.pos.add(clonedVel);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  public getCollisionBox(): ICollisionBox {
    return {
      pos: this.pos,
      radius: this.radius + 0,
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

  private circleCollidesWithRect(_c: CollideableEntity, _r: CollideableEntity) {
    const c = _c.getCollisionBox();
    const r = _r.getCollisionBox();

    const test = new Vec2(c.pos.x, c.pos.y);
    const collisionInfo = {
      top: false,
      bottom: false,
      right: false,
      left: false,
    };

    // left else right
    if (c.pos.x < r.pos.x) {
      test.x = r.pos.x;
      collisionInfo.left = true;
    } else if (c.pos.x > r.pos.x + r.width!) {
      test.x = r.pos.x + r.width!;
      collisionInfo.right = true;
    }

    // top else bottom
    if (c.pos.y < r.pos.y) {
      test.y = r.pos.y;
      collisionInfo.top = true;
    } else if (c.pos.y > r.pos.y + r.height!) {
      test.y = r.pos.y + r.height!;
      collisionInfo.bottom = true;
    }

    const distance = c.pos.dist(test);

    return {
      collided: distance <= c.radius!,
      collisionInfo,
      distance: c.pos.dist(test),
      ...collisionInfo,
    };
  }
}
