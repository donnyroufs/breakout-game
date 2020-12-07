import { GameRenderFunction, GameUpdateFunction } from "./configuration/types";
import DeltaTracker from "./DeltaTracker";

export class GameLoop {
  private renderFunction: GameRenderFunction;
  private updateFunction: GameUpdateFunction;
  private deltaTracker: DeltaTracker;

  private _delta: number = 0;
  private maxFps: number = 60;

  constructor(
    updateFunction: GameUpdateFunction,
    renderFunction: GameRenderFunction
  ) {
    this.updateFunction = updateFunction;
    this.renderFunction = renderFunction;
    this.deltaTracker = new DeltaTracker();
  }

  public get fps(): number {
    return Math.round(1 / this._delta);
  }

  public run() {
    setInterval(this.update.bind(this), 1000 / this.maxFps);
    window.requestAnimationFrame(this.render.bind(this));
  }

  private update() {
    // only using delta to calculate fps atm.
    this._delta = this.deltaTracker.getAndUpdateDelta();

    // Static delta value cus confused.
    this.updateFunction(1000 / this.maxFps);
  }

  private render() {
    this.renderFunction(this.fps);
    window.requestAnimationFrame(this.render.bind(this));
  }
}
