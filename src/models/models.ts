export type SimplePosition = {
  x: number;
  y: number;
};

export type FlatPosition = [number, number];

export type SimpleDimensions = {
  w: number;
  h: number;
};

export type PlayerCreature = {
  id: string;
  alive: boolean;
  hitPonumbers: number;
  initiative: number;
  x: number;
  y: number;
  category: string;
  timeCreated: number;
  timeModified: number;
  name: string;
};

export type PlayerCreatureKey = keyof PlayerCreature;

export type SimplePallete = {
  fillColor?: string;
  lineColor?: string;
};

export type PlayerGraphicConfiguration = SimpleDimensions &
  SimplePosition &
  SimplePallete;

export type GridGraphicConfiguration = SimpleDimensions &
  SimplePallete & {
    gridSpaces: SpaceGraphicConfiguration;
  };

export type SpaceGraphicConfiguration = SimpleDimensions & SimplePallete;

export type MoveHistoryRecord = { [key: string]: FlatPosition };
