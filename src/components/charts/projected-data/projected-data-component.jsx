import React from 'react';
import { PropTypes } from 'prop-types';
import { ReferenceDot, ReferenceArea, Label } from 'recharts';
import { isMicrosoftBrowser, wordWrap } from 'utils';
import { format } from 'd3-format';

const QUANTIFICATION_COLORS = {
  BAU: '#113750',
  QUANTIFIED: '#ffc735',
  NOT_QUANTIFIABLE: '#b1b1c1'
};

const ProjectedData = ({ data, dataMaxMin, activePoint, handleProjectedDataHover }) => {
  const isEdgeOrExplorer = isMicrosoftBrowser();
  return (
    data &&
    data.length > 0 &&
    data.map(point => {
      const isActivePoint =
        activePoint &&
        (point.x === activePoint.x && point.y === activePoint.y);
      let colorPoint = point.label.includes('BAU')
        ? QUANTIFICATION_COLORS.BAU
        : QUANTIFICATION_COLORS.QUANTIFIED;
      if (point.y === null) {
        colorPoint = QUANTIFICATION_COLORS.NOT_QUANTIFIABLE;
      }

      // LABELS
      // yearLabel
      const LENGHT_LIMIT = 15;
      const isLongLabel = point.label.length > LENGHT_LIMIT;
      const yearLabel = (
        <Label
          value={`${point.x}${isLongLabel ? '' : ` - ${point.label}`}`}
          position="top"
          fill="#8f8fa1"
          stroke="#fff"
          strokeWidth={isEdgeOrExplorer ? 0 : 8}
          style={{ paintOrder: 'stroke' }}
          fontSize="13px"
          offset={25}
        />
      );

      // extraLabelLine - For long labels
      const MAX_LINE_LENGHT = 15;
      const LABEL_OFFSET = 10;
      const DY = 20;
      const extraLabelLine = (text, offset) => (
        <Label
          key={text}
          value={text}
          position="insideTop"
          fill="#8f8fa1"
          stroke="#fff"
          strokeWidth={isEdgeOrExplorer ? 0 : 8}
          style={{ paintOrder: 'stroke', zIndex: 500 }}
          fontSize="13px"
          offset={offset}
        />
      );
      const extraLabel = wordWrap(point.label, MAX_LINE_LENGHT).map((l, i) =>
        extraLabelLine(l, LABEL_OFFSET + i * DY));

      // value label
      const valueLabelValue = point.isRange
        ? `${format('.3s')(point.y[0])}t - ${format('.3s')(point.y[1])}t`
        : `${format('.3s')(point.y)}t`;
      const valueLabel = (
        <Label
          value={valueLabelValue}
          position="top"
          stroke="#fff"
          strokeWidth={isEdgeOrExplorer ? 0 : 4}
          style={{ paintOrder: 'stroke' }}
          fill="#113750"
          fontSize="18px"
        />
      );

      // RANGES AND POINTS
      const isNotQuantifiable = point.y === null;
      if (point.isRange || isNotQuantifiable) {
        const key = `${point.label}-${point.y
          ? point.x + point.y[0] + point.y[1]
          : point.x}`;
        return (
          <ReferenceArea
            key={key}
            x1={point.x - 0.01}
            x2={point.x + 0.01}
            y1={isNotQuantifiable ? dataMaxMin.min : point.y[0]}
            y2={isNotQuantifiable ? dataMaxMin.max : point.y[1]}
            fill="transparent"
            fillOpacity={0}
            stroke={colorPoint}
            strokeOpacity={0.65}
            strokeWidth={isActivePoint ? 10 : 8}
            strokeLinejoin="round"
            onMouseEnter={() => handleProjectedDataHover(point)}
            onMouseLeave={() => handleProjectedDataHover(null)}
          >
            {isActivePoint ? yearLabel : null}
            {isActivePoint && isLongLabel ? extraLabel : null}
            {isActivePoint && point.y ? valueLabel : null}
          </ReferenceArea>
        );
      }
      if (point.x && point.y !== null) {
        return (
          <ReferenceDot
            key={`${point.label}-${point.x + point.y}`}
            x={point.x}
            y={point.y}
            fill={colorPoint}
            fillOpacity={0.65}
            stroke="#fff"
            strokeWidth={2}
            r={isActivePoint ? 8 : 6}
            onMouseEnter={() => handleProjectedDataHover(point)}
            onMouseLeave={() => handleProjectedDataHover(null)}
          >
            {isActivePoint ? yearLabel : null}
            {isActivePoint && isLongLabel ? extraLabel : null}
            {isActivePoint ? valueLabel : null}
          </ReferenceDot>
        );
      }
      return null;
    })
  );
}


ProjectedData.propTypes = {
  dataMaxMin: PropTypes.shape({ max: PropTypes.number, min: PropTypes.number}).isRequired,
  activePoint: PropTypes.string,
  handleProjectedDataHover: PropTypes.func.isRequired
};

ProjectedData.defaultProps = {
  activePoint: null
};

export default ProjectedData;
