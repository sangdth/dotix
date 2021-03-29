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
};

// TODO: Hero should have some special actions and skills
const Hero = (props: UnitProps) => {
  const { moveTo, skin } = props;

  return (
    <Unit
      width={width}
      height={height}
      moveTo={moveTo}
      anchor={[0.5, 0.6]}
      options={heroOptions}
      shape="circle"
      radius={width / 1.5}
      skin={skin}
      speed={10}
    />
  );
};

export default memo(Hero);
