import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { Graphics, Sprite, useTick } from '@inlet/react-pixi';
import {
  Body,
  Bodies,
  World,
} from 'matter-js';
import { cloneDeep } from 'lodash';

import {
  angularLerp,
  getDistance,
  lerp,
  memo,
  merge,
  xy,
} from '../lib/helpers';
import { defaultOptions, initialPosition } from '../lib/constants';
import { useEngine } from '../lib/hooks';

import type {
  Anchor,
  BaseUnitProps,
  Point,
  PositionAction,
  PositionState,
} from '../lib/types';

export type Props = BaseUnitProps & {
  anchor?: Anchor;
  fillStyle?: number[];
  lineStyle?: number[];
  skin?: string;
  speed?: number;
  moveTo?: Point;
};

const reducer = (s: PositionState, a: PositionAction): PositionState => {
  switch (a.type) {
    case 'update':
      return merge(s, a.payload);
    case 'reset':
      return initialPosition;
    default:
      return initialPosition;
  }
};

const Unit = (props: Props) => {
  const {
    anchor = 0.5,
    height = 10,
    width = 10,
    moveTo,
    radius = 10,
    speed = 6,
    shape = 'rectangle',
    skin = '/warning.png',
    options = {},
    lineStyle = [1, 0xff0000, 0.5],
    fillStyle = [0x00ff00, 0.1],
  } = props;

  // Initiate the engine and set some default value
  const engine = useEngine();
  // TODO: Still do not know is it OK?
  engine.world.gravity.y = 0;

  const [position, update] = useReducer(reducer, initialPosition);
  const { x = 0, y = 0 } = position;

  const finalOptions = merge(defaultOptions, options);

  // FIXME: make types here
  const body = useRef<any>();
  const graphics = useRef<any>();

  // Guess the next point to move, we will try to use this to find best direction
  const predict = useCallback(() => {
    const current = cloneDeep(body.current.position || initialPosition);
    const distance = getDistance(current, moveTo);

    if (distance === null) {
      return initialPosition;
    }

    const direction = Math.atan2(distance.y, distance.x);

    let dx = speed * Math.cos(direction);
    let dy = speed * Math.sin(direction);

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
  }, [speed, moveTo]);

  useTick((delta = 0) => {
    const next = predict();
    const g = graphics.current;
    const b = body.current;

    const step = merge(b.position, {
      x: lerp(b.position.x, next.x, delta),
      y: lerp(b.position.y, next.y, delta),
      direction: angularLerp(b.position.direction, next.direction, delta),
    });

    g.clear();

    g.lineStyle(...lineStyle);
    g.beginFill(...fillStyle);

    g.moveTo(...xy(b.vertices[0]));

    for (let j = 1; j < b.vertices.length; j += 1) {
      g.lineTo(...xy(b.vertices[j]));
    }

    g.lineTo(...xy(b.vertices[0]));

    if (/Circle/.test(b.label)) {
      g.moveTo(b.position.x, b.position.y);
      g.lineTo(
        b.position.x + Math.cos(b.angle) * radius,
        b.position.y + Math.sin(b.angle) * radius,
      );
    }

    Body.setPosition(b, next);

    // interpolate between the origin and next position
    update({
      type: 'update',
      payload: step,
    });
  });

  useEffect(() => {
    switch (shape) {
      case 'circle':
        body.current = Bodies.circle(x, y, radius, finalOptions);
        break;
      case 'rectangle':
        body.current = Bodies.rectangle(x, y, width, height - 5, finalOptions);
        break;
      default:
        throw new Error('This shape is not supported yet');
    }

    World.add(engine.world, body.current);

    return () => {
      World.remove(engine.world, body.current);
    };
  }, [body]); // eslint-disable-line

  return (
    <>
      <Graphics ref={graphics} />
      <Sprite
        image={skin}
        height={height}
        width={width}
        anchor={anchor}
        {...position}
      />
    </>
  );
};

export default memo(Unit);
