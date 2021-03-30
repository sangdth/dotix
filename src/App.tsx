import React, { useCallback, useState } from 'react';

import {
  Container,
  EngineProvider,
  Hero,
  Stage,
  TilingSprite,
  Tree,
} from './components';
import { stageOptions } from './lib/constants';

const width = 1080;
const height = 720;

export default function App() {
  const initHero1 = { x: 100, y: 300 };
  const initHero2 = { x: 450, y: 250 };
  const [newPosition, setNewPosition] = useState(initHero1);

  // TODO: Need to move this down to the Hero or Unit level
  const handleMoveTo = useCallback((e: any) => {
    setNewPosition({ ...e.data.global });
  }, []);

  return (
    <Stage
      width={width}
      height={height}
      options={stageOptions}
    >
      <EngineProvider>
        <Container
          interactive
          x={0}
          y={0}
          rightdown={handleMoveTo}
        >
          <TilingSprite
            image="/sand.png"
            width={width}
            height={height}
            tilePosition={{ x: 0, y: 0 }}
          />

          <Hero
            id="hero1"
            position={initHero1}
            moveTo={newPosition}
            skin="/bunny.png"
          />

          <Hero
            id="hero2"
            position={initHero2}
            skin="/bunny.png"
          />

          <Tree id="tree-1" position={{ x: 600, y: 100 }} />
        </Container>
      </EngineProvider>
    </Stage>
  );
}
