import React, { useState } from 'react';

import Unit from './Unit';
// import type { PositionState } from '../lib/types';

type Props = {
  // position: PositionState;
};

const total = 2;

const random = () => Math.floor(((Math.random() * 10) % total) + 1);

const Tree = (props: Props) => {
  const [index, setIndex] = useState(random());

  return (
    <Unit
      skin={`/tree-${index}.png`}
      width={40}
      height={50}
      position={{ x: 400, y: 200 }}
    />
  );
};

export default Tree;
