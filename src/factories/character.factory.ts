import { CharacterGraphicConfiguration, SimplePosition } from "models/models";
import { Graphics } from "pixi.js";

export const drawCharacter = (
  c: CharacterGraphicConfiguration,
  cpos: SimplePosition
) => {
  const g = new Graphics();
  g.clear();
  g.beginFill(c.fillColor);
  g.drawCircle(cpos.x - c.x * 2, cpos.y - c.y * 2, c.h / 2);
  g.endFill();
  return g;
};
