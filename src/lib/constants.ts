import type { PositionState } from './types';

export const stageOptions = {
  antialias: true,
  backgroundColor: 0x333333,
  // powerPreference: 'high-performance', // detect dual graphic cards before use
};

export const initialState: PositionState = {
  x: 10,
  y: 50,
  anchor: { x: 0.5, y: 1 },
  rotation: 0,
  direction: 0,
};
