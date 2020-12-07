import { GameRenderFunction, GameUpdateFunction } from "./configuration/types";
export class GameLoop {
  private _lastCall: number | null = null;
  private _accumulator = 0;
  private _deltaTime = 1 / 60;

  constructor(
    private updateFunction: GameUpdateFunction,
    private renderFunction: GameRenderFunction
  ) {}

  public run() {
    if (this._lastCall === null) {
      this._lastCall = Date.now();
    }

    let delta = Date.now() - this._lastCall;

    this._lastCall = Date.now();
    this._accumulator += delta;

    while (this._accumulator >= this._deltaTime) {
      this.updateFunction(delta / 1000);
      this._accumulator -= this._deltaTime;
    }

    this.renderFunction(this.fps);
    window.requestAnimationFrame(this.run.bind(this));
  }

  get fps() {
    return Math.round(1 / this._deltaTime);
  }
}
