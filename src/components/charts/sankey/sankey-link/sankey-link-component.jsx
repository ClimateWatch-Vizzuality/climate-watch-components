import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './sankey-link-styles.scss';

function SankeyLink({ sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX, linkWidth }) {
  const minLinkWidth = 2;
  return (
    <path
      className={styles.link}
      d={`
        M${sourceX},${sourceY}
        C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
      `}
      fill="none"
      stroke="#333"
      strokeWidth={linkWidth < minLinkWidth ? minLinkWidth : linkWidth}
      strokeOpacity="0.2"
    />
  );
}

SankeyLink.propTypes = {
  sourceX: PropTypes.number,
  targetX: PropTypes.number,
  sourceY: PropTypes.number,
  targetY: PropTypes.number,
  sourceControlX: PropTypes.number,
  targetControlX: PropTypes.number,
  linkWidth: PropTypes.number
};

SankeyLink.defaultProps = {
  sourceX: null,
  targetX: null,
  sourceY: null,
  targetY: null,
  sourceControlX: null,
  targetControlX: null,
  linkWidth: null
};

export default SankeyLink;
