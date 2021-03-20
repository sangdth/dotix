import * as React from 'react';
import { useRef, useReducer, useState } from 'react';
import {
  Container,
  Stage,
  Sprite,
  useTick,
} from './components';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const reducer = (_, { data }) => data;

  console.log('### count: ', count);

  const Bunny = () => {
    const [motion, update] = useReducer(reducer);
    const iter = useRef(0);
    useTick((delta) => {
      const i = (iter.current += (0.05 * delta)); // eslint-disable-line
      update({
        type: 'update',
        data: {
          x: Math.sin(i) * 100,
          y: Math.sin(i / 1.5) * 100,
          rotation: Math.sin(i) * Math.PI,
          anchor: Math.sin(i / 2),
        },
      });
    });

    return (
      <Sprite
        image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        {...motion} // eslint-disable-line
      />
    );
  };
  return (
    <Stage>
      <Container x={150} y={150}>
        <Bunny />
      </Container>
    </Stage>
  );
}

export default App;
