import React, { useEffect, useRef } from 'react';
import merge from 'deepmerge';
import { Graphics, Sprite, useTick } from '@inlet/react-pixi';
import { Bodies, World } from 'matter-js';

import { initialState } from '../lib/constants';
import { memo, xy } from '../lib/helpers';
import { useEngine } from '../lib/hooks';
import type { PositionState, MatterBodiesArgs } from '../lib/types';

type Props = {
  position?: Partial<PositionState>;
  skin?: string;
  width?: number;
  height?: number;
  shape?: 'circle' | 'rectangle' | 'poligon' | 'trapezoid' | 'fromVertices';
  config?: MatterBodiesArgs;
  options?: any;
  lineStyle?: number[];
  fillStyle?: number[];
};

const Unit = (props: Props) => {
  const {
    config = { x: 0, y: 0, radius: 0 },
    position = { x: 0, y: 0 },
    skin = '/warning.png',
    height = 10,
    width = 10,
    shape = 'rectangle',
    options = {},
    lineStyle = [1, 0xff0000, 1],
    fillStyle = [0xff0000, 0],
  } = props;

  const p: PositionState = merge(initialState, position);

  const engine = useEngine();

  const body = useRef<any>();
  const graphics = useRef<any>();

  useTick(() => {
    const g = graphics.current;
    const b = body.current;

    if (g && b) {
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
          b.position.x + Math.cos(b.angle) * (height / 2),
          b.position.y + Math.sin(b.angle) * (height / 2),
        );
      }
    }
  });

  useEffect(() => {
    const {
      // x, // TODO: Is it the x,y on the World?
      // y, //       and does it same with x,y in pixi
      // width = 0,
      // height = 0,
      radius = 0,
    } = config;
    const { x = 0, y = 0 } = position;

    switch (shape) {
      case 'circle':
        body.current = Bodies.circle(x, y, radius, options);
        break;
      case 'rectangle':
        body.current = Bodies.rectangle(x, y, width, height, options);
        break;
      default:
        throw new Error('This type of shape does not supported yet');
    }

    if (body) {
      World.add(engine.world, body.current);
    }

    return () => {
      World.remove(engine.world, body.current);
    };
  }, [body, config, engine, width, height, options, shape, position]);

  /* <Sprite */
  /*   ref={graphics} */
  /*   image={skin} */
  /*   height={height} */
  /*   width={width} */
  /*   {...p} */
  /* /> */
  return (
    <Graphics ref={graphics} />
  );
};

export default memo(Unit);
