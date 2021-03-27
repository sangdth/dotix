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

const Hero = (props: UnitProps) => {
  const { moveTo, skin } = props;

  return (
    <Unit
      width={width}
      height={height}
      radius={width / 2}
      speed={3}
      shape="circle"
      skin={skin}
      moveTo={moveTo}
      options={heroOptions}
    />
  );
};

export default memo(Hero);
