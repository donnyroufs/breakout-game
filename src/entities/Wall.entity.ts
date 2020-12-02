import { IEntityOptions } from "../engine/configuration/interfaces";
import { Entity } from "../engine/Entity";

export class Wall extends Entity {
  constructor(props: IEntityOptions) {
    super(props);

    this.width = 40;
    this.height = 20;
  }
}
