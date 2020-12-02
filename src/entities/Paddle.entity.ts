import { Entity } from "../engine/Entity";
import {
  IKeyboard,
  IEntityOptions,
  IGameData,
} from "../engine/configuration/interfaces";

export class Paddle extends Entity {
  private velX: number = 0;
  private speed: number = 200;

  constructor(props: IEntityOptions = {}) {
    super(props);

    this.color = "blue";
    this.width = 120;
    this.height = 20;
  }

  update({ keyboard }: IGameData, delta: number) {
    this.velX = 0;
    this.move(keyboard, delta);
  }

  protected move(keyboard: IKeyboard, delta: number) {
    if (keyboard.isAnyKeyPressed(["a"])) {
      this.velX = -(this.speed * delta);
    }

    if (keyboard.isAnyKeyPressed(["d"])) {
      this.velX = this.speed * delta;
    }

    this.x += this.velX;
  }

  public setup({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
