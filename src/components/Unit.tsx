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

export enum ActionType {
  Local = 'LOCAL',
  Origin = 'ORIGIN',
  Next = 'NEXT',
}

export type Position = {
  x: number;
  y: number;
  rotation: number;
  anchor: number;
  direction: number;
};

type PositionState = {
  origin: Position;
  local: Position | null;
  next: Position | null;
};

type PositionAction = {
  type: ActionType;
  payload: Record<string, Position>;
};

export type UnitProps = {
  moveTo: { x: number, y: number };
  position: Position;
};

const Unit = (props: UnitProps) => {
  const {
    moveTo,
    position = {
      x: 0, y: 0, rotation: 0, anchor: 0,
    },
  } = props;

  // const app = useApp();

  const initialState = useMemo(() => ({
    origin: position,
    local: position,
    next: null,
  }), [position]);

  const reducer = (state: PositionState, action: PositionAction): PositionState => {
    switch (action.type) {
      case ActionType.Local:
        return action.payload.local;
      case ActionType.Origin:
        return action.payload.origin;
      case ActionType.Next:
        return action.payload.next;
      default:
        throw new Error('Not correct PositionAction');
    }
  };

  const [motion, update] = useReducer(reducer, initialState);

  // For reaching from outside
  const unitRef = useRef(initialState);

  const predict = useCallback((target: Position) => {
    const origin = cloneDeep(unitRef.current.local);

    // Make the new target become the current origin
    update({
      type: ActionType.Origin,
      payload: { origin },
    });

    unitRef.current.origin = origin;

    const distance = getDistance(motion.local, target);

    if (distance !== null) {
      const nextDirection = Math.atan2(distance.y, distance.x);

      let dx = 7 * Math.cos(nextDirection);
      let dy = 7 * Math.sin(nextDirection);

      if (distance.total < 100) {
        dx *= distance.total / 100;
        dy *= distance.total / 100;
      }

      const next = {
        ...motion.next,
        x: motion.local.x + dx,
        y: motion.local.y + dy,
        direction: nextDirection,
      };

      update({
        type: ActionType.Next,
        payload: { next },
      });

      unitRef.current.next = next;
    }
  }, [motion]);

  const interpolate = (delta: number) => {
    if (!motion.local || !motion.origin || !motion.next) return;

    const local = {
      x: lerp(motion.origin.x, motion.next.x, delta),
      y: lerp(motion.origin.y, motion.next.y, delta),
      direction: angularLerp(motion.origin.direction, motion.next.direction, delta),
    };
    // interpolate between the origin and next states
    update({
      type: ActionType.Local,
      payload: { local },
    });

    unitRef.current.local = local;
  };

  const preMoveTo = usePrevious(moveTo);

  useEffect(() => {
    if (!isEqual(preMoveTo, moveTo)) {
      predict(moveTo);
    }
  }, [moveTo, preMoveTo, predict]);

  useTick((delta = 0) => {
    const a = 5 * delta;
    interpolate(a);
  });

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      {...motion.local} // eslint-disable-line
    />
  );
};

export default memo(Unit);
