import React from 'react';
import PropTypes from 'prop-types';
import BitAccordion from '@bit/aabdaab.cw-components.global.accordion';

/**
 * Table component to show nested data structures
 */
const Accordion = props => <BitAccordion {...props} />;

Accordion.propTypes = {
  /** Active slug
   * use 'none' to close all of them
   * or the first will will be open
  */
  openSlug: PropTypes.string,
  /** Returns the section slug clicked */
  handleOnClick: PropTypes.func,
  /** Data structure to display */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      definitions: PropTypes.array
    })
  ),
  /** Any data structure to render
   * with the same order than the data prop
   */
  children: PropTypes.node,
  /** Use when accordion is used in another accordion */
  isChild: PropTypes.bool,
  /** Use when accordion will wrap another accordion */
  hasNestedCollapse: PropTypes.bool,
  /** Themable options */
  theme: PropTypes.shape({
    accordion: PropTypes.string
  })
};

Accordion.defaultProps = {
  openSlug: '',
  handleOnClick: () => {},
  children: null,
  isChild: false,
  hasNestedCollapse: false,
  data: [],
  theme: {}
};

export default Accordion;
