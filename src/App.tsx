import * as React from 'react';
import {
  useCallback,
  useRef,
  useReducer,
  useState,
  useEffect,
  useMemo,
  memo,
} from 'react';
import {
  Container, Stage, Sprite, TilingSprite,
} from './components';
import { useTick, useMouse } from './hooks';
import './App.css';

type State = {
  x: number;
  y: number;
  rotation: number;
  anchor: number;
};

type Action = {
  type: string;
  data: State;
};

const stageOptions = {
  antialias: true,
  backgroundColor: 0x333333,
  // powerPreference: 'high-performance', // detect dual graphic cards before use
};

type ChildProps = {
  moveTo: { x: number, y: number };
};

const reducer = ({}: State, { data }: Action): State => data;

const Bunny = memo((props: ChildProps) => {
  const { moveTo } = props;

  const initialState = useMemo(() => ({
    x: 0,
    y: 0,
    rotation: 0,
    anchor: 0,
  }), []);

  const [motion, update] = useReducer(reducer, initialState);

  const iter = useRef(initialState);

  useTick((delta = 0) => {
    const dx = iter.current.x - moveTo.x;
    const dy = iter.current.y - moveTo.y;

    const a = 5 * delta;

    if (Math.sqrt(dx * dx + dy * dy) >= 6) {
      if (dx >= 0) {
        iter.current.x -= a;
      } else {
        iter.current.x += a;
      }

      if (dy >= 0) {
        iter.current.y -= a;
      } else {
        iter.current.y += a;
      }
    } else {
      iter.current.x = moveTo.x;
      iter.current.y = moveTo.y;
    }

    const newState = {
      ...initialState,
      x: iter.current.x,
      y: iter.current.y,
    };

    update({
      type: 'update',
      data: newState,
    });
  });

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      {...motion} // eslint-disable-line
    />
  );
}, (a:any, b:any) => (a.moveTo.x === b.moveTo.x && a.moveTo.y === b.moveTo.y));

function App() {
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
  console.log('### newPosition: ', newPosition);

  const handleMoveTo = useCallback((e: any) => {
    // this is fucking awesome, without ... it will always stick to the global
    // because of reference :D yay :D
    setNewPosition({ ...e.data.global });
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
        <Bunny moveTo={newPosition} />
      </Container>
    </Stage>
  );
}

export default App;
