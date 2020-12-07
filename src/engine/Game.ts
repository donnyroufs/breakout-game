import { World } from "./World";
import { Entity } from "./Entity";
import { GameLoop } from "./GameLoop";
import { IGameData, IKeyboard } from "./configuration/interfaces";
import { CanvasConfig } from "./configuration/enums";
import { CollideableEntity } from "./index";

const DEBUG = false;

export abstract class Game {
  private gameData: IGameData;
  private entities: Entity[] = [];
  protected world!: World;

  constructor(ctx: CanvasRenderingContext2D, keyboard: IKeyboard) {
    this.gameData = {
      ctx,
      keyboard,
      canvasHeight: CanvasConfig.height as number,
      canvasWidth: CanvasConfig.width as number,
    };

    this.setup();
  }

  public run() {
    const gameLoop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    );
    gameLoop.run();
  }

  private update(delta: number) {
    this.entities.forEach((entity) => entity.update(this.gameData, delta));
  }

  public abstract setup(): void;

  private render(fps: number) {
    const { ctx, canvasHeight, canvasWidth } = this.gameData;
    window.document.title = `FPS: ${fps}`;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    this.entities.forEach((entity) => {
      entity.draw(ctx);

      if (entity instanceof CollideableEntity && DEBUG) {
        entity.drawCollisionBox(ctx);
      }
    });
  }

  protected addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  protected addManyEntities(entities: Entity[]) {
    entities.forEach((entity) => this.entities.push(entity));
  }
}
