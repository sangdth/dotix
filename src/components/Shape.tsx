import React, { useEffect, useRef } from 'react';
import { World, Bodies } from 'matter-js';
import { Graphics } from '@inlet/react-pixi';

import { useEngine, useTick } from '../lib/hooks';
import { xy } from '../lib/helpers';

type Props = {
  type: string;
  config: any;
  options: any;
  lineStyle: number[];
  fillStyle: number[];
};

const Shape = (props: Props) => {
  const {
    type,
    config,
    options = {},
    lineStyle = [1, 0xff0000, 1],
    fillStyle = [0xff0000, 0],
  } = props;

  const engine = useEngine();

  const body = useRef();
  const graphics = useRef();

  useTick((delta = 0) => {
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
        g.lineTo(b.position.x + Math.cos(b.angle) * config.radius, b.position.y + Math.sin(b.angle) * config.radius);
      }
    }
  });

  useEffect(() => {
    const args = Object.keys(config).reduce((a, c) => [...a, config[c]], []);
    body.current = Bodies[type](...args, options);

    World.add(engine.world, body.current);

    return () => {
      World.remove(engine.world, body.current);
    };
  }, []);

  return <Graphics ref={graphics} />;
};

export default Shape;
