import * as React from 'react';
import { useCallback, useState } from 'react';

import {
  Container,
  Stage,
  TilingSprite,
  Unit,
} from './components';

const stageOptions = {
  antialias: true,
  backgroundColor: 0x333333,
  // powerPreference: 'high-performance', // detect dual graphic cards before use
};

function App() {
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
  console.log('### newPosition: ', newPosition);

  const handleMoveTo = useCallback((e: any) => {
    setNewPosition({ ...e.data.global }); // Need to create new object here
  }, []);

  return (
    <Stage width={800} height={400} options={stageOptions}>
      <Container
        interactive
        x={0}
        y={0}
        rightdown={handleMoveTo}
      >
        <TilingSprite
          image="/sand.png"
          width={800}
          height={400}
          tilePosition={{ x: 0, y: 0 }}
        />
        <Unit moveTo={newPosition} />
      </Container>
    </Stage>
  );
}

export default App;
