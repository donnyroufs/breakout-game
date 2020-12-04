import {
  CanvasConfig,
  CollisionType,
  CollisionDir,
} from "./configuration/enums";
import { Entity } from "./Entity";

export class CollisionHandler {
  public checkCollision(entity: Entity, entities: Entity[], delta: number) {
    entities.forEach((entityB) => {
      if (entity === entityB) return;

      const distance = entity.pos.getDistance(entityB.pos);

      // this.entityCollision(entity, entityB);
    });
  }
}
