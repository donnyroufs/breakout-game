import { GameUpdateFunction } from "./configuration/types";
import { DeltaTracker } from "./DeltaTracker";

export class GameLoop {
  private updateFunction: GameUpdateFunction;
  private deltaTracker: DeltaTracker;

  constructor(updateFunction: GameUpdateFunction) {
    this.updateFunction = updateFunction;
    this.deltaTracker = new DeltaTracker();
  }

  public run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  private loop() {
    const delta = this.deltaTracker.getAndUpdateDelta();

    this.updateFunction(delta);

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
