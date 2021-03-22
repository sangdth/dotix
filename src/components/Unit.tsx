import * as React from 'react';
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import { cloneDeep, isEqual } from 'lodash';

import {
  memo,
  getDistance,
  lerp,
  angularLerp,
} from '../lib/helpers';
import { usePrevious } from '../lib/hooks';
import type {
  PositionState,
  PositionAction,
} from '../lib/types';

export type UnitProps = {
  moveTo: { x: number, y: number };
  // position: Position;
};

const initialState: PositionState = {
  x: 0,
  y: 0,
  rotation: 0,
  anchor: 0,
  direction: 0,
};

const reducer = (s: PositionState, a: PositionAction): PositionState => {
  switch (a.type) {
    case 'update':
      return {
        ...s,
        ...a.payload,
      };
    case 'reset':
      return initialState;
    default:
      return initialState;
  }
};

const Unit = (props: UnitProps) => {
  const { moveTo } = props;

  const [motion, update] = useReducer(reducer, initialState);

  const unitRef = useRef(initialState);

  useTick((delta = 0) => {
    const distance = getDistance(cloneDeep(unitRef.current), moveTo);
    const arc = Math.atan2(distance.y, distance.x);

    let dx = 5 * Math.cos(arc);
    let dy = 5 * Math.sin(arc);

    if (distance.value < 100) {
      dx *= distance.value / 100;
      dy *= distance.value / 100;
    }

    // unitRef.current.direction =
    // angularLerp(unitRef.current.direction, arc, delta);

    if (distance.value >= 3) {
      unitRef.current.x += dx;
      unitRef.current.y += dy;
    }

    const newState = {
      ...initialState,
      x: unitRef.current.x,
      y: unitRef.current.y,
    };

    update({
      type: 'update',
      payload: newState,
    });
  });

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      {...unitRef.current} // eslint-disable-line
    />
  );
};

export default memo(Unit);
