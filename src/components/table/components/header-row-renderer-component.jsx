import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import idleSort from '../assets/collapse.svg';
import styles from '../table-styles.scss';

const headerRowRenderer = props => {
  const { className, columns, style, hiddenColumnHeaderLabels } = props;
  return (
    <div className={className} role="row" style={style}>
      {columns.map(c => {
        const columnName = c.props['aria-label'];
        if (!hiddenColumnHeaderLabels.includes(columnName) && !c.props['aria-sort']) {
          c.props.children.push(
            <span key={c}>
              <Icon icon={idleSort} theme={{ icon: styles.idleSortIcon }} />
            </span>
          );
        }
        return c;
      })}
    </div>
  );
};

headerRowRenderer.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  columns: PropTypes.arrayOf(PropTypes.node).isRequired,
  style: PropTypes.string,
  hiddenColumnHeaderLabels: PropTypes.arrayOf(PropTypes.string)
}

headerRowRenderer.defaultProps = {
  className: null,
  style: null,
  hiddenColumnHeaderLabels: []
}


export default headerRowRenderer;
