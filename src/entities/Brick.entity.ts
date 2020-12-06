import { IEntityOptions } from "../engine/configuration/interfaces";
import { CollideableEntity } from "../engine/index";

export class Brick extends CollideableEntity {
  constructor(props: IEntityOptions) {
    super(props);

    this.width = 40;
    this.height = 20;
  }
}
