import { CollideableEntity } from "./CollideableEntity";

export abstract class World {
  protected width: number = 0;
  protected margin: number = 100;
  protected padding: number = 10;
  protected rows: number = 5;

  public bricks: CollideableEntity[] = [];

  constructor() {
    this.setup();
  }

  public abstract setup(): void;
}
