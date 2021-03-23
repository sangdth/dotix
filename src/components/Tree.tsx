import React, { useState } from 'react';

import Unit from './Unit';
import type { PositionState } from '../lib/types';

type Props = {
  position: Partial<PositionState>;
};

const total = 2;

const random = () => Math.floor(((Math.random() * 10) % total) + 1);

const Tree = (props: Props) => {
  const { position } = props;
  const [index, setIndex] = useState(random());

  return (
    <Unit
      skin={`/tree-${index}.png`}
      width={24}
      height={32}
      position={position}
    />
  );
};

export default Tree;
