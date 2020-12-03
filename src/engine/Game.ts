import { CollisionHandler } from "./CollisionHandler";
import { World } from "./World";
import { Entity } from "./Entity";
import { GameLoop } from "./GameLoop";
import { IGameData, IKeyboard } from "./configuration/interfaces";
import { CanvasConfig } from "./configuration/enums";

export abstract class Game {
  private gameData: IGameData;
  private entities: Entity[] = [];
  protected world!: World;
  protected collisionHandler: CollisionHandler = new CollisionHandler();

  constructor(ctx: CanvasRenderingContext2D, keyboard: IKeyboard) {
    this.gameData = {
      ctx,
      keyboard,
    };

    this.setup();
  }

  run() {
    const gameLoop = new GameLoop(this.update.bind(this));
    gameLoop.run();
  }

  private update(delta: number) {
    const { ctx } = this.gameData;

    ctx.clearRect(0, 0, CanvasConfig.width, CanvasConfig.height);

    this.entities.forEach((entity) => {
      entity.update(this.gameData, delta);
      // this.collisionHandler.checkCollision(entity, this.entities, delta);
      entity.draw(this.gameData.ctx);
    });
  }

  public abstract setup(): void;

  protected addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  protected addManyEntities(entities: Entity[]) {
    entities.forEach((entity) => this.entities.push(entity));
  }
}
