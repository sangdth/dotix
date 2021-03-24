import React, { createContext, useContext, useState } from 'react';
import { Engine } from 'matter-js';

import { useTick } from '@inlet/react-pixi';

export const EngineContext = createContext<any>({});

export const useEngine = () => useContext(EngineContext);

export type Props = {
  children: React.ReactNode;
};

export const EngineProvider = (props: Props) => {
  const { children } = props;
  const [engine] = useState(Engine.create);

  useTick((d = 0) => Engine.update(engine, d * (1000 / 60), 1));

  return (
    <EngineContext.Provider value={engine}>
      {typeof children === 'function' ? children(engine) : children}
    </EngineContext.Provider>
  );
};

export default EngineProvider;
