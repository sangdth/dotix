import React, { useState } from 'react';
import merge from 'deepmerge';

import { memo } from '../lib/helpers';
import type { PositionState } from '../lib/types';
import Unit from './Unit';

type Props = {
  position: Partial<PositionState>;
  options?: any;
};

const total = 2;

const random = () => Math.floor(((Math.random() * 10) % total) + 1);

const defaultOptions = {
  isStatic: true,
};

const Tree = (props: Props) => {
  const { position, options = {} } = props;
  const [n] = useState(random());

  return (
    <Unit
      width={24}
      height={32}
      position={position}
      shape="rectangle"
      skin={`/tree-${n}.png`}
      options={merge(defaultOptions, options)}
    />
  );
};

export default memo(Tree);
