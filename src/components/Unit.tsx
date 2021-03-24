import React from 'react';
import merge from 'deepmerge';
import { Sprite } from '@inlet/react-pixi';

import { initialPosition } from '../lib/constants';
import { memo } from '../lib/helpers';
import type { PositionState, BaseUnitProps } from '../lib/types';

import Physic from './Physic';

export type Props = BaseUnitProps & {
  options?: any;
  skin?: string;
};

const Unit = (props: Props) => {
  const {
    position = initialPosition,
    skin = '/warning.png',
    height = 10,
    width = 10,
    shape = 'rectangle',
    options = {},
  } = props;

  const p: PositionState = merge(initialPosition, position);

  return (
    <Physic
      shape={shape}
      options={options}
      height={height}
      width={width}
      position={p}
    >
      <Sprite
        image={skin}
        height={height}
        width={width}
        {...p}
      />
    </Physic>
  );
};

export default memo(Unit);
