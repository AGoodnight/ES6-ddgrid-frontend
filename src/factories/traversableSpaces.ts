import { CharacterGraphicConfiguration, SimplePosition } from "models/models";
import { Graphics } from "pixi.js";

type TraversableSpacesProps = {
  spaceConfig: Record<string, any>;
  radiusInSquares: number;
  center: SimplePosition;
  onMove: (s: TraversableSpaces, p: SimplePosition) => void;
};

class TraversableSpaces {
  private _props: TraversableSpacesProps;
  spaces: Graphics;

  constructor(props: TraversableSpacesProps) {
    this._props = props;
    this.spaces = this.drawSpace(props.center);
  }

  moveCharacter = () => {
    console.log("moving");
    this._props?.onMove(this, { x: 1, y: 0 });
  };

  drawSpace = (center: SimplePosition) => {
    const g = new Graphics();
    const c = this._props.spaceConfig;
    if (c) {
      g.clear();
      g.beginFill(c.fillColor);
      g.drawRect(
        center.x * this._props.spaceConfig.w,
        (center.y - 1) * this._props.spaceConfig.h,
        c.h,
        c.w
      );
      g.endFill();

      g.on("pointerdown", () => {
        this.moveCharacter();
      });
      g.eventMode = "static";
    }
    return g;
  };

  rerender = (c: SimplePosition) => {
    const { x, y } = c;
    this.spaces.x = x;
    this.spaces.y = y;
  };
}

export default TraversableSpaces;
