import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import closeIcon from './assets/legend-close.svg';
import styles from './tag-styles.scss';
import Icon from '../icon/icon';

class Tag extends PureComponent {
  handleClick = e => {
    const { label, onRemove } = this.props;
    e.preventDefault();
    onRemove(label);
  };

  render() {
    const {
      data,
      theme,
      color,
      label,
      className,
      canRemove,
      tooltipId
    } = this.props;

    const tagContent = (
      <React.Fragment>
        <span className={styles.dot} style={{ backgroundColor: color }} />
        {
          data && data.title && tooltipId
            ? (
              <p
                className={styles.label}
                data-tip={data.title}
                data-for={tooltipId}
              >
                {label}
              </p>
)
            : <p className={cx(styles.label, theme.label)}>{label}</p>
        }
        {
          canRemove && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={this.handleClick}
          >
            <Icon icon={closeIcon} theme={{ icon: styles.icon }} />
          </button>
            )
        }
      </React.Fragment>
    );
    return data && data.url ? (
      <div>
        <a href={data.url} className={cx(styles.tag, className)}>
          {tagContent}
        </a>
      </div>
) : <li className={cx(styles.tag, className)}>{tagContent}</li>;
  }
}

Tag.propTypes = {
  data: Proptypes.object,
  onRemove: Proptypes.func,
  tooltipId: Proptypes.string,
  label: Proptypes.string,
  color: Proptypes.string,
  className: Proptypes.string,
  canRemove: Proptypes.bool,
  theme: Proptypes.object
};

Tag.defaultProps = {
  canRemove: false,
  tooltipId: '',
  data: {},
  onRemove: () => {
  },
  label: '',
  color: 'black',
  className: '',
  theme: {}
};

export default Tag;
