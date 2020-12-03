import { CanvasConfig } from "./engine/configuration/enums";
import { Ball } from "./entities/Ball.entity";
import { Game } from "./engine/index";

export class SandboxGame extends Game {
  public setup() {
    const ball = new Ball({
      color: "blue",
      x: CanvasConfig.width / 2,
      y: CanvasConfig.height / 2,
    });

    this.addEntity(ball);
  }
}
