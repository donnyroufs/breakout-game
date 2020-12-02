import { IKeyboard } from "./configuration/interfaces";

export class Keyboard implements IKeyboard {
  private keyMap: Map<string, boolean> = new Map();

  constructor(canvasEl: HTMLCanvasElement) {
    this.setup(canvasEl);
  }

  public setup(canvasEl: HTMLCanvasElement) {
    canvasEl.addEventListener("keydown", (e) => {
      this.keyMap.set(e.key, true);
    });

    canvasEl.addEventListener("keyup", (e) => {
      this.keyMap.set(e.key, false);
    });
  }

  public keyPressed(key: string) {
    const foundKey = this.keyMap.get(key);

    if (!foundKey) {
      return false;
    }

    return foundKey;
  }

  public isAnyKeyPressed(keys: string[]) {
    return keys.some((key) => this.keyPressed(key));
  }
}
