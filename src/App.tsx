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

  /* useEffect(() => { */
  /*   const newState = { */
  /*     ...initialState, */
  /*     x: moveTo.x, */
  /*     y: moveTo.y, */
  /*   }; */

  /*   iter.current = newState; */

  /*   update({ */
  /*     type: 'update', */
  /*     data: newState, */
  /*   }); */
  /* }, [moveTo, initialState]); */

  useTick(() => {
    // const i = (iter.current += (0.05 * delta)); // eslint-disable-line
    const newState = {
      ...initialState,
      x: moveTo.x,
      y: moveTo.y,
    };

    iter.current = newState;

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

  const handleMouseDown = useCallback((e: any) => {
    setNewPosition(e.data.global);
  }, []);

  return (
    <Stage width={800} height={400} options={stageOptions}>
      <Container
        interactive
        x={0}
        y={0}
        rightdown={handleMouseDown}
        rightup={() => setNewPosition({ x: 0, y: 0 })}
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
