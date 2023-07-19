import { Application, Container, autoDetectRenderer } from "pixi.js";
import { drawGrid } from "./factories/grid.factory";
import {
  CHARACTERS,
  CHARACTER_CONFIGURATION,
  GRID_CONFIG,
  SPACE_CONFIG,
  STAGE_CONFIG,
} from "./constants/config.constants";
import { SimplePosition } from "./models/models";
import API from "./api/api";
import TraversableSpaces from "./components/traversableSpaces";
import Character from "./components/character";

const api = API();

const init = async () => {
  const data = await api.fetchCharacter(CHARACTERS.Kendall);

  if (data) {
    renderScene({
      x: data.x,
      y: data.y,
    });
  } else {
    document.querySelector("#Stage")?.append(`Error`);
  }
};

const renderScene = (lastPosition: SimplePosition) => {
  const app = new Application<HTMLCanvasElement>({
    width: STAGE_CONFIG.w,
    height: STAGE_CONFIG.h,
  });
  document.querySelector("#Stage")?.appendChild(app.view);

  const container = new Container();

  const grid = drawGrid(GRID_CONFIG);

  const character = new Character(
    CHARACTER_CONFIGURATION,
    {
      x: (lastPosition.x - 1) * SPACE_CONFIG.w,
      y: (lastPosition.y - 1) * SPACE_CONFIG.h,
    },
    SPACE_CONFIG
  );

  const spaces = new TraversableSpaces({
    spaceConfig: SPACE_CONFIG,
    radiusInSquares: 3,
    onMove: (s: any, pos: SimplePosition) => {
      const relativePosition = {
        x: pos.x / SPACE_CONFIG.w + 1,
        y: pos.y / SPACE_CONFIG.h + 1,
      };
      character.pos$.next({
        x: pos.x,
        y: pos.y,
      });
      s.center$.next(relativePosition);
      api.moveCharacter(CHARACTERS.Kendall, relativePosition);
    },
    center: lastPosition,
  });

  container.addChild(grid);
  container.addChild(character.graphic);
  container.addChild(spaces.spaces);

  app.stage.addChild(container);
};

init();
