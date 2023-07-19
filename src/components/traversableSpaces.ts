import { SimplePosition } from "models/models";
import { Container, Graphics } from "pixi.js";
import { Subject } from "rxjs";

type TraversableSpacesProps = {
  spaceConfig: Record<string, any>;
  radiusInSquares: number;
  center: SimplePosition;
  onMove: (s: TraversableSpaces, p: SimplePosition) => void;
};

class TraversableSpaces {
  private _props: TraversableSpacesProps;
  spaces: Container;
  center$: Subject<SimplePosition> = new Subject();
  radius$: Subject<number> = new Subject();

  constructor(props: TraversableSpacesProps) {
    this._props = props;
    this.radius$.next(props.radiusInSquares);
    this.center$.next(props.center);
    this.spaces = new Container();
    this.renderSpaces(props.center);
    this.center$.subscribe((c: SimplePosition) => {
      this.renderSpaces(c);
    });
  }

  renderSpaces = (center: SimplePosition) => {
    this.spaces.removeChildren();
    const radius = this._props.radiusInSquares;
    const additionalSquares: { above: number; below: number }[] = [];

    for (
      let r = 0 - this._props.radiusInSquares;
      r < this._props.radiusInSquares + 1;
      r++
    ) {
      additionalSquares.push({
        below: r < 0 ? radius + r : radius - r,
        above: r < 0 ? radius + r : radius - r,
      });
    }

    const offsetCenter = {
      x: center.x - this._props.radiusInSquares - 1,
      y: center.y,
    };

    for (let r = 0; r < this._props.radiusInSquares * 2 + 1; r++) {
      if (r !== this._props.radiusInSquares)
        this.spaces.addChild(
          this.drawSpace({
            x: offsetCenter.x + r,
            y: offsetCenter.y,
          })
        );
      for (let l = 0; l < additionalSquares[r].above; l++) {
        if (l !== this._props.radiusInSquares + 1)
          this.spaces.addChild(
            this.drawSpace({
              x: offsetCenter.x + r,
              y: offsetCenter.y - l - 1,
            })
          );
      }
      for (let l = 0; l < additionalSquares[r].below; l++) {
        if (l !== this._props.radiusInSquares + 1)
          this.spaces.addChild(
            this.drawSpace({
              x: offsetCenter.x + r,
              y: offsetCenter.y + l + 1,
            })
          );
      }
    }
  };

  trueCenter = (center: SimplePosition): SimplePosition => {
    return {
      x: this.trueX(center.x),
      y: this.trueY(center.y),
    };
  };

  trueX = (coordinate: number): number => {
    return coordinate * this._props.spaceConfig.w;
  };

  trueY = (coordinate: number): number => {
    return (coordinate - 1) * this._props.spaceConfig.h;
  };

  moveCharacter = (center: SimplePosition) => {
    this._props?.onMove(this, center);
  };

  drawSpace = (center: SimplePosition) => {
    const g = new Graphics();
    const c = this._props.spaceConfig;
    const thisCenter = this.trueCenter(center);
    if (c) {
      g.clear();
      g.lineStyle({ color: "#000", width: 1 });
      g.beginFill(c.fillColor);
      g.drawRect(thisCenter.x, thisCenter.y, c.h, c.w);
      g.endFill();
      g.on("pointerdown", (event) => {
        this.moveCharacter(thisCenter);
      });
      g.eventMode = "static";
    }
    return g;
  };
}

export default TraversableSpaces;
