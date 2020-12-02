import {
  CanvasConfig,
  CollisionType,
  CollisionDir,
} from "./configuration/enums";
import { Entity } from "./Entity";

export class CollisionHandler {
  public update(entity: Entity, entities: Entity[], delta: number) {
    // entities.forEach((entityB) => {
    //   if (entity.id === entityB.id) return;
    //   this.entityCollision(entity, entityB);
    // });

    this.canvasCollision(entity, delta);
  }

  // private entityCollision(a: Entity, b: Entity) {
  //   if (a.x === b.x && a.y === b.y) {
  //     console.log("Collision between: ", { a, b });
  //   }
  // }

  private canvasCollision(entity: Entity, delta: number) {
    if (entity.x + entity.width >= CanvasConfig.width) {
      entity.handleCollision({
        type: CollisionType.canvas,
        collider: null,
        dir: CollisionDir.right,
      });
    } else if (entity.x <= 0) {
      entity.handleCollision({
        type: CollisionType.canvas,
        collider: null,
        dir: CollisionDir.left,
      });
    } else if (entity.y <= 0) {
      entity.handleCollision({
        type: CollisionType.canvas,
        collider: null,
        dir: CollisionDir.top,
      });
    } else if (entity.y >= CanvasConfig.height) {
      entity.handleCollision({
        type: CollisionType.canvas,
        collider: null,
        dir: CollisionDir.bottom,
      });
    }
  }
}
