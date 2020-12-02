import { Canvas } from "./engine/Canvas";
import { Keyboard } from "./engine/Keyboard";
import { BreakoutGame as Game } from "./BreakoutGame";

async function bootstrap() {
  const canvasEl = document.querySelector("canvas") as HTMLCanvasElement;

  if (canvasEl == null) {
    throw new Error("No canvas provided");
  }

  const canvas = new Canvas(canvasEl);
  const keyboard = new Keyboard(canvasEl);

  const ctx = canvas.setup();

  const game = new Game(ctx, keyboard);

  game.run();
}

bootstrap();
