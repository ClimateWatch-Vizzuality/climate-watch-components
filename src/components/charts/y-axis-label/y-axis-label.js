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

const yAxisLabel = (unit, labelConfig = { dx: '8', dy: '20' }) => {
  const { dx, dy, className } = labelConfig;
  return (
    <Label
      content={() => (
        <text dx={dx} dy={dy} className={cx(styles.yAxisLabel, className)}>
          {unit && htmlToSvgSubscript(unit)}
        </text>
      )}
    />
  );
};

export default yAxisLabel;
