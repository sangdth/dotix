import * as React from 'react';
import { useCallback, useState } from 'react';

import {
  Container,
  Stage,
  TilingSprite,
  Hero,
  Tree,
} from './components';
import { initialState, stageOptions } from './lib/constants';

function App() {
  const [newPosition, setNewPosition] = useState(initialState);

  const handleMoveTo = useCallback((e: any) => {
    setNewPosition({ ...e.data.global }); // Need to create new object here
  }, []);

  return (
    <Stage width={600} height={400} options={stageOptions}>
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
          skin="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        />

        <Tree />
      </Container>
    </Stage>
  );
}

export default App;
