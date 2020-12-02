import { IDeltaTracker } from "./configuration/interfaces";

class DeltaTracker implements IDeltaTracker {
  private lastTime: number | null = null;

  public getAndUpdateDelta() {
    if (this.lastTime === null) {
      this.lastTime = this.getTimestampMS();
      return 0;
    }

    const currentTime = this.getTimestampMS();
    const delta = (currentTime - this.lastTime) / 1000;

    this.lastTime = currentTime;

    return delta;
  }

  private getTimestampMS() {
    return new Date().getTime();
  }
}

export default DeltaTracker;
