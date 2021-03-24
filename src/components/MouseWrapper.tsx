import React, { useEffect } from 'react';
import { useApp } from '@inlet/react-pixi';
import {
  Bodies,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  World,
} from 'matter-js';

import { memo } from '../lib/helpers';
import { useEngine } from '../lib/hooks';

type Props = {
  children: React.ReactNode;
  constraint?: any;
};

const MouseWrapper = (props: Props) => {
  const {
    children,
    constraint = {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  } = props;

  const app = useApp();
  const engine = useEngine();

  useEffect(() => {
    const mouse = Mouse.create(app.view);
    const mouseConstraint = MouseConstraint.create(engine, { mouse, constraint });

    const scale = 1 / window.devicePixelRatio;
    Mouse.setScale(mouse, { x: scale, y: scale });

    World.add(engine.world, mouseConstraint);

    Engine.run(engine);

    Events.on(mouseConstraint, 'mousedown', () => {
      World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    });

    Events.on(mouseConstraint, 'rightdown', () => {
      World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    });

    return () => {
      // @ts-expect-error FIXME
      World.remove(engine.world, mouseConstraint);
    };
  }, []); // eslint-disable-line

  return <>{children}</>;
};

export default memo(MouseWrapper);
