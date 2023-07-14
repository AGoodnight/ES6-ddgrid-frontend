export type SimplePosition = {
  x: number;
  y: number;
};

export type SimpleDimensions = {
  w: number;
  h: number;
};

export type Entity = {
  id: string;
  alive: boolean;
  hitPoints: number;
  initiative: number;
  x: number;
  y: number;
  name: string;
};

export type SimplePallete = {
  fillColor?: string;
  lineColor?: string;
};

export type CharacterGraphicConfiguration = SimpleDimensions &
  SimplePosition &
  SimplePallete;

export type GridGraphicConfiguration = SimpleDimensions &
  SimplePallete & {
    gridSpaces: SpaceGraphicConfiguration;
  };

export type SpaceGraphicConfiguration = SimpleDimensions & SimplePallete;
