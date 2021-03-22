export type Point = {
  x: number;
  y: number;
};

export type Position = Point & {
  rotation: number;
  anchor: number;
  direction: number;
};

export type PositionState = {
  origin: Position | null;
  local: Position | null;
  next: Position | null;
};

export type PositionAction = {
  type: 'local' | 'origin' | 'next';
  payload: Partial<PositionState>;
};

export type Distance = {
  x: number; // should be dx
  y: number; // should be dy
  total: number;
};
