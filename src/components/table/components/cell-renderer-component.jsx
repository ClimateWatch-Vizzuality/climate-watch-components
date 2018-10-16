import React from 'react';
import PropTypes from 'prop-types';
import { sanitize } from 'utils';
import styles from '../table-styles.scss';

const cellRenderer = ({
  props: { parseHtml, titleLinks, emptyValueLabel },
  cell
}) => {
  let { cellData } = cell;
  const { rowIndex, dataKey } = cell;
  cellData = sanitize(cellData);
  // check for TitleLink
  const titleLink =
    titleLinks &&
    titleLinks[rowIndex] &&
    titleLinks[rowIndex].find(t => t.columnName === dataKey);

  if (titleLink) {
    return titleLink.url === 'self' ? (
      <a target="_blank" rel="noopener noreferrer" href={cellData}>
        {cellData}
      </a>
    ) : (
      <a href={titleLink.url}>
        {cellData}
      </a>
    );
  }
  // render Html or finally cellData
  return parseHtml ? (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: cellData }} />
  ) : (
    cellData ||
    (emptyValueLabel ? (
      <div className={styles.emptyValue}>
        {emptyValueLabel}
      </div>
    ) : (
      ''
    ))
  );
};

cellRenderer.propTypes = {
  cell: PropTypes.object.isRequired,
  props: PropTypes.shape({
    titleLinks: PropTypes.array, // [ [ {columnName: 'title field name in the table', url:'/destination-url' or 'self'}, ... ] ]
    trendLine: PropTypes.string, // 'field name of the trend line column'
    parseHtml: PropTypes.bool,
    emptyValueLabel: PropTypes.string
  }).isRequired
};

export default cellRenderer;
