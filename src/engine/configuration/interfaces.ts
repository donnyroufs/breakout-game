import { Entity } from "@/entities/Entity";
import { CollisionType, CollisionDir } from "./enums";

export interface IKeyboard {
  setup: (canvasEl: HTMLCanvasElement) => void;
  keyPressed: (key: string) => boolean;
  isAnyKeyPressed: (keys: string[]) => boolean;
}

export interface IGameData {
  ctx: CanvasRenderingContext2D;
  keyboard: IKeyboard;
}

export interface IDeltaTracker {
  getAndUpdateDelta: () => number;
}

export interface IEntity {
  update: (gameData: IGameData, delta: number) => void;
}

export interface IEntityOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: string;
}

export interface ICanvas {
  setup: () => CanvasRenderingContext2D;
}

export interface ICollisionData {
  type: CollisionType;
  collider: Entity | null;
  dir: CollisionDir;
}
