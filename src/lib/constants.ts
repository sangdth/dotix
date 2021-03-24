import type { PositionState } from './types';

export const stageOptions = {
  antialias: true,
  backgroundColor: 0x333333,
  // powerPreference: 'high-performance', // detect dual graphic cards before use
};

export const defaultOptions = {
  friction: 8,
  density: 1,
  restitution: 0.9,
  stiffness: 1,
};

export const initialPosition: PositionState = {
  x: 10,
  y: 50,
  anchor: { x: 0.5, y: 0.8 },
  rotation: 0,
  direction: 0,
};
