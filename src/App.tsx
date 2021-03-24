import * as React from 'react';
import { useCallback, useState } from 'react';

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

function App() {
  const [newPosition, setNewPosition] = useState(initialPosition);

  const handleMoveTo = useCallback((e: any) => {
    setNewPosition({ ...e.data.global }); // Need to create new object here
  }, []);

  return (
    <Stage width={600} height={400} options={stageOptions}>
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
              width={600}
              height={400}
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

export default App;
