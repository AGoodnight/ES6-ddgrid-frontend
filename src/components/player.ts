import {
  PlayerGraphicConfiguration,
  SimplePosition,
  SpaceGraphicConfiguration,
} from "models/models";
import { Graphics } from "pixi.js";
import { Subject } from "rxjs";

class Player {
  graphic: Graphics;
  pos$: Subject<SimplePosition> = new Subject();

  constructor(
    c: PlayerGraphicConfiguration,
    cpos: SimplePosition,
    sConfig: SpaceGraphicConfiguration
  ) {
    this.pos$.next(cpos);
    const character: Graphics = this.drawPlayer(c, sConfig);
    character.x = cpos.x;
    character.y = cpos.y;
    this.graphic = character;

    this.pos$.subscribe((pos) => {
      console.log(pos);
      this.graphic.position.set(pos.x, pos.y);
    });
  }

  drawPlayer = (
    c: PlayerGraphicConfiguration,
    s: SpaceGraphicConfiguration
  ) => {
    const g = new Graphics();
    g.clear();
    g.beginFill(c.fillColor);
    g.drawCircle(c.x + (s.w - c.w), c.y + (s.h - c.h), c.h / 2);
    g.endFill();
    return g;
  };
}

export default Player;
