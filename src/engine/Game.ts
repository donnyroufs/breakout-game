import { World } from "./World";
import { Entity } from "./Entity";
import { GameLoop } from "./GameLoop";
import { IGameData, IKeyboard } from "./configuration/interfaces";
import { CanvasConfig } from "./configuration/enums";

export abstract class Game {
  private gameData: IGameData;
  private entities: Entity[] = [];
  protected world!: World;

  constructor(ctx: CanvasRenderingContext2D, keyboard: IKeyboard) {
    this.gameData = {
      ctx,
      keyboard,
      entities: this.entities,
    };

    this.setup();
  }

  run() {
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

  private render() {
    const { ctx } = this.gameData;

    ctx.clearRect(0, 0, CanvasConfig.width, CanvasConfig.height);
    this.entities.forEach((entity) => entity.draw(ctx));
  }

  protected addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  protected addManyEntities(entities: Entity[]) {
    entities.forEach((entity) => this.entities.push(entity));
  }
}
