import React from 'react';
import { Sprite } from '@inlet/react-pixi';

import { defaultOptions, initialPosition } from '../lib/constants';
import { memo, merge } from '../lib/helpers';
import Physic from './Physic';

import type { BaseUnitProps } from '../lib/types';

export type Props = BaseUnitProps & {
  options?: any;
  skin?: string;
};

const Unit = (props: Props) => {
  const {
    position = {},
    skin = '/warning.png',
    height = 10,
    width = 10,
    radius,
    shape = 'rectangle',
    options = {},
  } = props;

  const finalPosition = merge(initialPosition, position);
  const finalOptions = merge(defaultOptions, options);

  return (
    <Physic
      shape={shape}
      options={finalOptions}
      height={height}
      width={width}
      radius={radius}
      position={finalPosition}
    >
      <Sprite
        image={skin}
        height={height}
        width={width}
        {...finalPosition}
      />
    </Physic>
  );
};

export default memo(Unit);
