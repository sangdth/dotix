import React, { useEffect } from 'react';
import { useApp } from '@inlet/react-pixi';
import { Mouse, MouseConstraint, World } from 'matter-js';

import { useEngine } from '../lib/hooks';

type Props = {
  children: React.ReactNode;
  constraint?: any;
};

const MouseWrapper = (props: Props) => {
  const { children, constraint = { stiffness: 0.2 } } = props;

  const app = useApp();
  const engine = useEngine();

  useEffect(() => {
    const mouse = Mouse.create(app.view);
    const mouseConstraint = MouseConstraint.create(engine, { mouse, constraint });

    World.add(engine.world, mouseConstraint);

    return () => {
      // @ts-expect-error FIXME
      World.remove(engine.world, mouseConstraint);
    };
  }, [app, engine, constraint]);

  return <>{children}</>;
};

export default MouseWrapper;
