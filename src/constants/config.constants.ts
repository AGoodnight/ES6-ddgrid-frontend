import {
  CharacterGraphicConfiguration,
  GridGraphicConfiguration,
  SimpleDimensions,
  SimplePallete,
  SimplePosition,
  SpaceGraphicConfiguration,
} from "models/models";

export const CHARACTERS: Record<string, string> = {
  Kendall: "575f84c5-0561-46cf-85ae-70f270ab5bbb",
};

export const DEFAULT_SQUARE_DIMENSIONS: SimpleDimensions = {
  w: 40,
  h: 40,
};

export const STAGE_CONFIG: SimpleDimensions & SimplePosition & SimplePallete = {
  x: 0,
  y: 0,
  w: 800,
  h: 800,
  lineColor: "#000",
  fillColor: "#eee",
};

export const SPACE_CONFIG: SpaceGraphicConfiguration = {
  ...DEFAULT_SQUARE_DIMENSIONS,
  fillColor: "#aaf",
};

export const GRID_CONFIG: GridGraphicConfiguration = {
  ...STAGE_CONFIG,
  gridSpaces: SPACE_CONFIG,
  lineColor: "#000",
  fillColor: "#eee",
};

export const CHARACTER_CONFIGURATION: CharacterGraphicConfiguration = {
  x: 10,
  y: 10,
  w: 30,
  h: 30,
  fillColor: "#f22",
};

export const NUM_OF_H_LINES: number = GRID_CONFIG.w / SPACE_CONFIG.w;
export const NUM_OF_V_LINES: number = GRID_CONFIG.h / SPACE_CONFIG.h;
