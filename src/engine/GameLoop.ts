import { GameRenderFunction, GameUpdateFunction } from "./configuration/types";
import { DeltaTracker } from "./DeltaTracker";

export class GameLoop {
  private deltaTracker: DeltaTracker;

  constructor(
    private updateFunction: GameUpdateFunction,
    private renderFunction: GameRenderFunction
  ) {
    this.deltaTracker = new DeltaTracker();
  }

  public run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  private loop() {
    const delta = this.deltaTracker.getAndUpdateDelta();

    this.updateFunction(delta);
    this.renderFunction();

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
