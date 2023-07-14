import { Application, Container, autoDetectRenderer } from "pixi.js";
import { drawGrid } from "./factories/grid.factory";
import { drawCharacter } from "./factories/character.factory";
import {
  CHARACTER_CONFIGURATION,
  GRID_CONFIG,
  SPACE_CONFIG,
  STAGE_CONFIG,
} from "./constants/config.constants";
import { SimplePosition } from "./models/models";
import API from "./api/api";
import TraversableSpaces from "./factories/traversableSpaces";

const api = API();

const renderScene = (lastPosition: SimplePosition) => {
  const app = new Application<HTMLCanvasElement>({
    width: STAGE_CONFIG.w,
    height: STAGE_CONFIG.h,
  });
  document.querySelector("#Stage")?.appendChild(app.view);

  const container = new Container();

  const grid = drawGrid(GRID_CONFIG);
  const character = drawCharacter(CHARACTER_CONFIGURATION, {
    x: lastPosition.x * SPACE_CONFIG.w,
    y: lastPosition.y * SPACE_CONFIG.h,
  });

  const spaces = new TraversableSpaces({
    spaceConfig: SPACE_CONFIG,
    radiusInSquares: 3,
    onMove: (s: any, pos: SimplePosition) => {
      character.x += pos.x * SPACE_CONFIG.w;
      character.y += pos.y * SPACE_CONFIG.h;
      const { x, y } = character;
      s.rerender({ x, y });
    },
    center: lastPosition,
  }).spaces;

  container.addChild(grid);
  container.addChild(character);
  container.addChild(spaces);

  app.stage.addChild(container);
};

const init = async () => {
  const data = await api.fetchCharacter();

  if (data) {
    renderScene({
      x: data.x,
      y: data.y,
    });
  } else {
    document.querySelector("#Stage")?.append(`Error`);
  }
};

init();
