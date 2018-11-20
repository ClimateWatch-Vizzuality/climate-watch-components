import React from 'react';
import { Label } from 'recharts';

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

const yAxisLabel = unit => (
  <Label
    content={() => (
      <text x="8" y="20" fontSize="13px" stroke="#b1b1c1" strokeWidth="0.5">
        {unit && htmlToSvgSubscript(unit)}
      </text>
    )}
  />
);

export default yAxisLabel;
