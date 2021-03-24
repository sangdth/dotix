export type Point = {
  x: number;
  y: number;
};

export type MatterBodiesArgs = Point & {
  height?: number;
  maxSides?: number;
  radius?: number;
  sides?: number;
  slope?: number;
  width?: number;
  options?: any; // FIXME
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

export type BaseUnitProps = {
  position?: Partial<PositionState>;
  shape?: 'circle' | 'rectangle' | 'poligon' | 'trapezoid' | 'fromVertices';
  radius?: number;
  height?: number;
  width?: number;
  options?: any; // options for the matter-js mostly
};
