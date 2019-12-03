import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { sanitize } from 'utils';
import styles from '../table-styles.scss';

const cellRenderer = ({
  props: { parseHtml, parseMarkdown, titleLinks, emptyValueLabel },
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
        {titleLink.label || cellData}
      </a>
    ) : (
      <a href={titleLink.url}>
        {titleLink.label || cellData}
      </a>
    );
  }
  if (parseMarkdown) {
    return (
      <ReactMarkdown
        className={styles.description}
        source={cellData}
      />
    );
  }

  if (parseHtml) {
     // eslint-disable-next-line react/no-danger
     return <div dangerouslySetInnerHTML={{ __html: cellData }} />
  }

  const renderEmptyValue = emptyValueLabel ? (
    <div className={styles.emptyValue}>
      {emptyValueLabel}
    </div>
  ) : "";
  return cellData || renderEmptyValue;

};

cellRenderer.propTypes = {
  cell: PropTypes.shape({}).isRequired,
  props: PropTypes.shape({
    titleLinks: PropTypes.array, // [ [ {columnName: 'title field name in the table', url:'/destination-url' or 'self'}, ... ] ]
    trendLine: PropTypes.string, // 'field name of the trend line column'
    parseHtml: PropTypes.bool,
    parseMarkdown: PropTypes.bool,
    emptyValueLabel: PropTypes.string
  }).isRequired
};

export default cellRenderer;
