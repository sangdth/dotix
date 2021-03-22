export type Point = {
  x: number;
  y: number;
};

export type PositionState = Point & {
  rotation: number;
  anchor: number | [number, number] | Point;
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
