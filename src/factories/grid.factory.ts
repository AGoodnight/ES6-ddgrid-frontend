import { GridGraphicConfiguration } from "models/models";
import { Container, Graphics } from "pixi.js";

export const drawGrid = (c: GridGraphicConfiguration) => {
  const g = new Graphics();
  const s = c.gridSpaces;
  const numOfHLines: number = c.w / s.w;
  const numOfVLines: number = c.h / s.h;

  g.clear();
  g.beginFill(c.fillColor);
  g.drawRect(0, 0, c.w, c.h);
  g.endFill();
  g.lineStyle(1, c.lineColor);
  for (let chl = 1; chl < numOfHLines; chl += 1) {
    g.moveTo(s.w * chl, 0);
    g.lineTo(s.w * chl, c.h);
  }
  for (let cvl = 1; cvl < numOfVLines; cvl += 1) {
    g.moveTo(0, s.h * cvl);
    g.lineTo(c.w, s.h * cvl);
  }
  return g;
};
