import React from 'react';
import { Label } from 'recharts';
import cx from 'classnames';
import * as styles from './y-axis-label-styles.scss';

const htmlToSvgSubscript = unitY => {
  const splittedUnit = unitY.split('<sub>');
  return splittedUnit.map(chain => {
    if (chain.includes('</sub>')) {
      const subChain = chain.split('</sub>');
      return (
        <tspan>
          <tspan dy="4" fontSize="11px">{subChain[0]}</tspan>
          <tspan dy="-4">{subChain[1]}</tspan>
        </tspan>
      );
    }
    return <tspan>{chain}</tspan>;
  });
};

const yAxisLabel = (unit, className, x = '8', y = '20') => (
  <Label
    content={() => (
      <text x={x} y={y} className={cx(styles.yAxisLabel, className)}>
        {unit && htmlToSvgSubscript(unit)}
      </text>
    )}
  />
);

export default yAxisLabel;
