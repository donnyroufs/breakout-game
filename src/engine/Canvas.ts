import { CanvasConfig } from "./configuration/enums";
import { ICanvas } from "./configuration/interfaces";

export class Canvas implements ICanvas {
  constructor(public readonly canvas: HTMLCanvasElement) {}
  public setup() {
    this.canvas.height = CanvasConfig.height;
    this.canvas.width = CanvasConfig.width;
    this.canvas.style.border = CanvasConfig.border;
    this.canvas.focus();

    return this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }
}
