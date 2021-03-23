import * as React from 'react';
import {
  useCallback,
  useReducer,
} from 'react';
import { useTick } from '@inlet/react-pixi';
import { cloneDeep } from 'lodash';
import merge from 'deepmerge';

import {
  getDistance,
  lerp,
  angularLerp,
  memo,
} from '../lib/helpers';
import type {
  PositionState,
  PositionAction,
} from '../lib/types';
import { initialState } from '../lib/constants';
import Unit from './Unit';

const reducer = (s: PositionState, a: PositionAction): PositionState => {
  switch (a.type) {
    case 'update':
      return merge(s, a.payload);
    case 'reset':
      return initialState;
    default:
      return initialState;
  }
};

export type UnitProps = {
  moveTo?: { x: number, y: number };
  skin: string;
  // position: Position;
};

const Hero = (props: UnitProps) => {
  const {
    moveTo,
    skin,
  } = props;

  const [position, update] = useReducer(reducer, initialState);

  // Guess the next point to move, we will try to use this to find best direction
  const predict = useCallback(() => {
    const current = cloneDeep(position);
    const distance = getDistance(current, moveTo);
    if (distance === null) {
      return initialState;
    }
    const direction = Math.atan2(distance.y, distance.x);

    let dx = 5 * Math.cos(direction);
    let dy = 5 * Math.sin(direction);

    if (distance.value < 50) {
      dx *= distance.value / 50;
      dy *= distance.value / 50;
    }

    if (distance.value >= 1) {
      return merge(current, {
        x: current.x + dx,
        y: current.y + dy,
        direction,
      });
    }
    return current;
  }, [moveTo, position]);

  useTick((delta = 0) => {
    const next = predict();

    const step = merge(position, {
      x: lerp(position.x, next.x, delta),
      y: lerp(position.y, next.y, delta),
      direction: angularLerp(position.direction, next.direction, delta),
    });

    // interpolate between the origin and next states
    update({
      type: 'update',
      payload: step,
    });
  });

  return (
    <Unit
      skin={skin}
      position={position}
      width={30}
      height={40}
      options={{
        friction: 0.8,
        density: 0.001,
        restitution: 0.5,
        stiffness: 0.4,
      }}
    />
  );
};

export default memo(Hero);
