import { Vec2 } from "./../engine/math/Vec2";
import { CollideableEntity } from "../engine/index";
import {
  IKeyboard,
  IEntityOptions,
  IGameData,
} from "../engine/configuration/interfaces";

export class Paddle extends CollideableEntity {
  private vel: Vec2 = new Vec2(0, 0);
  private speed: number = 300;

  constructor(props: IEntityOptions = {}) {
    super(props);

    this.color = "blue";
    this.width = 120;
    this.height = 20;
  }

  update({ keyboard, canvasWidth }: IGameData, delta: number) {
    this.move(keyboard, delta);
    this.onCollideCanvas(canvasWidth);
  }

  protected move(keyboard: IKeyboard, delta: number) {
    const clonedVel = this.vel.clone();

    if (keyboard.isAnyKeyPressed(["a"])) {
      clonedVel.sub(this.speed * delta);
    }

    if (keyboard.isAnyKeyPressed(["d"])) {
      clonedVel.sub(-(this.speed * delta));
    }

    this.pos.add(clonedVel);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
