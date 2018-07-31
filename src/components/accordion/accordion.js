import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import cx from 'classnames';
import Icon from '../icon/icon';

import dropdownArrow from './assets/dropdown-arrow.svg';
import styles from './accordion-styles.scss';

/**
 * Table component to show nested data structures
 */
class Accordion extends PureComponent {
  render() {
    const {
      data,
      theme,
      handleOnClick,
      openSlug,
      children,
      isChild,
      hasNestedCollapse
    } = this.props;
    return (
      <div className={theme.wrapper}>
        {
          data && data.length > 0 && data.map((section, index) => {
              let isOpen = index === 0;
              if (openSlug) {
                if (openSlug !== 'none') {
                  const isActiveInResults = data.some(d => d.slug === openSlug);
                  isOpen = openSlug === section.slug ||
                    index === 0 && !isActiveInResults;
                } else {
                  isOpen = false;
                }
              }
              const title = section.parent
                ? `${section.parent.name} | ${section.title}`
                : section.title;
              return (
                <section
                  key={`${section.slug}-${section.title}`}
                  className={cx(styles.accordion, theme.accordion)}
                >
                  <button
                    type="button"
                    className={cx(
                      styles.header,
                      isChild ? styles.subHeader : ''
                    )}
                    onClick={() => handleOnClick(section.slug, isOpen)}
                  >
                    <div className={styles.layout}>
                      <div className={styles.title}>
                        {title}
                        <Icon
                          icon={dropdownArrow}
                          className={cx(styles.iconArrow, {
                            [styles.isOpen]: isOpen
                          })}
                        />
                      </div>
                    </div>
                  </button>
                  <Collapse
                    isOpened={isOpen}
                    hasNestedCollapse={hasNestedCollapse}
                  >
                    {
                      isOpen && (
                      <div>
                        {React.Children.map(children, (child, i) => {
                              if (i === index) return child;
                              return null;
                            })}
                      </div>
                        )
                    }
                  </Collapse>
                </section>
              );
            })
        }
      </div>
    );
  }
}

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
    wrapper: PropTypes.string,
    accordion: PropTypes.string
  })
};

Accordion.defaultProps = {
  data: [],
  theme: {},
  openSlug: '',
  children: null,
  handleOnClick: () => {
  },
  hasNestedCollapse: false,
  isChild: false
};

export default Accordion;
