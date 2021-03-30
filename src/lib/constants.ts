import type { PositionState } from './types';

export const stageOptions = {
  autoDensity: true,
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
  x: 50,
  y: 150,
  direction: 0,
};
