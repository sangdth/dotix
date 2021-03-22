export type Point = {
  x: number;
  y: number;
};

export type PositionState = Point & {
  rotation: number;
  anchor: number;
  direction: number;
};

export type PositionAction = {
  type: 'update' | 'reset';
  payload: Partial<PositionState>;
};

export type Distance = {
  x: number; // should be dx
  y: number; // should be dy
  value: number;
};
