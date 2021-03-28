import React, { useState } from 'react';

import { memo, merge, random } from '../lib/helpers';
import Unit from './Unit';

import type { PositionState } from '../lib/types';

type Props = {
  position: Partial<PositionState>;
  options?: any;
};

const total = 2;

const treeOptions = {
  isStatic: true,
};

const Tree = (props: Props) => {
  const { position = {}, options = {} } = props;
  const [n] = useState(random(total));

  return (
    <Unit
      anchor={[0.5, 0.8]}
      width={24}
      height={32}
      position={position}
      shape="rectangle"
      skin={`/tree-${n}.png`}
      options={merge(treeOptions, options)}
    />
  );
};

export default memo(Tree);
