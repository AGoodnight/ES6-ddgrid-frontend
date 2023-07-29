import {
  PlayerGraphicConfiguration,
  GridGraphicConfiguration,
  SimpleDimensions,
  SimplePallete,
  SimplePosition,
  SpaceGraphicConfiguration,
} from "models/models";

export const API_URL = "http://localhost:9000/graphql";

export const CREATURES: Record<string, string> = {
  Default: "a7413a34-aa3f-400d-b836-b750299922f5",
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

export const CHARACTER_CONFIGURATION: PlayerGraphicConfiguration = {
  x: 10,
  y: 10,
  w: 30,
  h: 30,
  fillColor: "#f22",
};

export const NUM_OF_H_LINES: number = GRID_CONFIG.w / SPACE_CONFIG.w;
export const NUM_OF_V_LINES: number = GRID_CONFIG.h / SPACE_CONFIG.h;
