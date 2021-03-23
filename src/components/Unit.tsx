import * as React from 'react';
import merge from 'deepmerge';
import { Sprite } from '@inlet/react-pixi';

import type { PositionState } from '../lib/types';
import { initialState } from '../lib/constants';
import { memo } from '../lib/helpers';

type Props = {
  position?: Partial<PositionState>;
  skin?: string;
  width?: number;
  height?: number;
};

const Unit = (props: Props) => {
  const {
    position = {},
    skin = '/warning.png',
    height = 50,
    width = 50,
  } = props;

  const p: PositionState = merge(initialState, position);

  return (
    <Sprite
      image={skin}
      height={height}
      width={width}
      {...p /* eslint-disable-line */} 
    />
  );
};

export default memo(Unit);
