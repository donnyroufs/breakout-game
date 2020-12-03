import {
  CanvasConfig,
  CollisionType,
  CollisionDir,
} from "./configuration/enums";
import { Entity } from "./Entity";

export class CollisionHandler {
  public checkCollision(entity: Entity, entities: Entity[], delta: number) {
    entities.forEach((entityB) => {
      if (entity.id === entityB.id) return;
      this.entityCollision(entity, entityB);
    });
  }

  private entityCollision(a: Entity, b: Entity) {
    if (a.x === b.x && a.y === b.y) {
      console.log("Collision between: ", { a, b });
    }
  }
}
