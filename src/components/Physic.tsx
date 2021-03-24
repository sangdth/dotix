import React, { useEffect, useRef } from 'react';
import { Graphics, useTick } from '@inlet/react-pixi';
import { Bodies, Engine, World } from 'matter-js';

import { memo, xy } from '../lib/helpers';
import { useEngine } from '../lib/hooks';
import type { BaseUnitProps } from '../lib/types';

type Props = BaseUnitProps & {
  children: React.ReactNode;
  fillStyle?: number[];
  lineStyle?: number[];
};

const Physic = (props: Props) => {
  const {
    children,
    position = { x: 0, y: 0 },
    height = 10,
    width = 10,
    radius = 10,
    shape = 'rectangle',
    options = {},
    lineStyle = [1, 0xff0000, 1],
    fillStyle = [0x00ff00, 0.2],
  } = props;

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
    const { x = 0, y = 0 } = position;

    switch (shape) {
      case 'circle':
        body.current = Bodies.circle(x, y, width / 2, options);
        break;
      case 'rectangle':
        body.current = Bodies.rectangle(x, y, width, height - 10, options);
        break;
      default:
        throw new Error('This type of shape does not supported yet');
    }

    return () => {
      World.remove(engine.world, body.current);
    };
  }, [body, engine, width, height, options, radius, shape, position]);

  useEffect(() => {
    World.add(engine.world, body.current);
    Engine.run(engine);
  }, []); // eslint-disable-line

  return (
    <>
      <Graphics ref={graphics} />
      {children}
    </>
  );
};

export default memo(Physic);
