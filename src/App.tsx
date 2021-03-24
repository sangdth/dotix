import React, { useCallback, useState } from 'react';

import {
  Container,
  EngineProvider,
  Hero,
  MouseWrapper,
  Stage,
  TilingSprite,
  Tree,
} from './components';
import { initialPosition, stageOptions } from './lib/constants';

const width = 1080;
const height = 720;

export default function App() {
  const [newPosition, setNewPosition] = useState(initialPosition);

  const handleMoveTo = useCallback((e: any) => {
    setNewPosition({ ...e.data.global }); // Need to create new object here
  }, []);

  return (
    <Stage width={width} height={height} options={stageOptions}>
      <EngineProvider>
        <MouseWrapper>
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
              moveTo={newPosition}
              skin="/bunny.png"
            />

            <Tree position={{ x: 400, y: 190 }} />
            <Tree position={{ x: 420, y: 205 }} />
            <Tree position={{ x: 410, y: 215 }} />
          </Container>
        </MouseWrapper>
      </EngineProvider>
    </Stage>
  );
}
