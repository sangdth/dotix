import React from 'react';

import { memo } from '../lib/helpers';
import Unit from './Unit';

export type UnitProps = {
  moveTo?: { x: number, y: number };
  skin: string;
};

const width = 30;
const height = 40;
const heroOptions = {
  density: 1,
  render: {
    strokeStyle: '#ffffff',
    sprite: {
      texture: '/bunny.png',
    },
  },
};

const Hero = (props: UnitProps) => {
  const { moveTo, skin } = props;

  return (
    <Unit
      width={width}
      height={height}
      moveTo={moveTo}
      anchor={[0.5, 0.8]}
      options={heroOptions}
      shape="circle"
      radius={width / 2}
      skin={skin}
      speed={3}
    />
  );
};

export default memo(Hero);
