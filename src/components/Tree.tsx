import React, { useState } from 'react';

import Unit from './Unit';
import type { PositionState } from '../lib/types';

type Props = {
  position: Partial<PositionState>;
  options?: any;
};

const total = 2;

const random = () => Math.floor(((Math.random() * 10) % total) + 1);

const Tree = (props: Props) => {
  const { position, options } = props;
  const [n] = useState(random());

  return (
    <Unit
      skin={`/tree-${n}.png`}
      width={24}
      height={32}
      position={position}
      options={{ isStatic: true }}
    />
  );
};

export default Tree;
