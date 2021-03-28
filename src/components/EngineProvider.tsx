import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Engine, Render, Runner } from 'matter-js';

import { useTick } from '@inlet/react-pixi';

export const EngineContext = createContext<any>({});

export const useEngine = () => useContext(EngineContext);

export type Props = {
  children: React.ReactNode;
};

// TODO: Should we change the name to WorldProvider
// and make the 4 big walls here?
export const EngineProvider = (props: Props) => {
  const { children } = props;
  const [engine] = useState(Engine.create);

  useTick((d = 0) => Engine.update(engine, d * (1000 / 60), 1));

  useEffect(() => {
    const render = Render.create({
      element: document.body,
      engine,
      options: {
        /* width: 800, */
        /* height: 600, */
        // showAngleIndicator: false,
        wireframes: false,
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);
  }, []);

  return (
    <EngineContext.Provider value={engine}>
      {typeof children === 'function' ? children(engine) : children}
    </EngineContext.Provider>
  );
};

export default EngineProvider;
