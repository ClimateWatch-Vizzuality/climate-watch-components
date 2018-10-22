import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styles from './sankey-link-styles.scss';

class SankeyLink extends PureComponent {
  constructor() {
    super();
    this.minLinkWidth = 2;
    this.state = { hover: false };
  }

  render() {
    const { sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX, linkWidth } = this.props;
    const { hover } = this.state;
    const updatedLinkWidth = linkWidth < this.minLinkWidth ? this.minLinkWidth : linkWidth;
    return (
      <path
        className={styles.link}
        d={`
          M${sourceX},${sourceY}
          C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
        `}
        fill="none"
        stroke="#333"
        strokeWidth={hover ? updatedLinkWidth + 2 : updatedLinkWidth}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        strokeOpacity="0.2"
      />
    );
  }
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
