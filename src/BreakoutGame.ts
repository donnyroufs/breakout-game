import { CanvasConfig } from "./engine/configuration/enums";
import { Game } from "./engine/Game";
import { BreakoutWorld as World } from "./BreakoutWorld";
import { Ball, Paddle } from "./entities/index";

export class BreakoutGame extends Game {
  public setup() {
    const paddle = new Paddle();
    const ball = new Ball({
      color: "#3f51b5",
      radius: 10,
    });

    paddle.setPos(
      CanvasConfig.width / 2 - paddle.width / 2,
      CanvasConfig.height - paddle.height - 40
    );
    ball.setPos(
      paddle.pos.x + paddle.width / 2,
      paddle.pos.y - paddle.height / 2
    );

    this.world = new World();

    this.addEntity(ball);
    this.addEntity(paddle);
    this.addManyEntities(this.world.bricks);
  }
}
