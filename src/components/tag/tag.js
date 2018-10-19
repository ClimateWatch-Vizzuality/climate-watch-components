import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';

import closeIcon from './assets/legend-close.svg';
import styles from './tag-styles.scss';
import Icon from '../icon/icon';
import dotsIcon from './assets/dots.svg';

class Tag extends PureComponent {
  handleClick = e => {
    const { label, onRemove } = this.props;
    e.preventDefault();
    onRemove(label);
  };

  getTooltipContent() {
    const {
      data,
      theme,
      color,
      label,
      canRemove,
      tooltipId,
      icon,
      coloredIcon
    } = this.props;
    const hasIcon = icon && (!color || coloredIcon);
    const renderIcon = close => {
      const iconColorProp = coloredIcon && { style: { fill: color } };
      let updatedIcon = icon;
      if (close) updatedIcon = closeIcon;
      return (
        <Icon
          icon={updatedIcon}
          theme={{ icon: cx(styles.icon, theme.icon) }}
          {...iconColorProp}
        />
      );
    };
    const tagContent = (
      <React.Fragment>
        {
          hasIcon
            ? renderIcon()
            : (
              <span
                className={cx(styles.dot, theme.dot)}
                style={{ backgroundColor: color }}
              />
)
        }
        {
          data && data.title && tooltipId
            ? (
              <p
                className={cx(styles.label, theme.label)}
                data-tip={data.title}
                data-for={tooltipId}
              >
                {label}
              </p>
)
            : (
              <p className={cx(styles.label, theme.label)}>
                {label}
              </p>
)
        }
        {
          canRemove && (
          <button
            type="button"
            className={cx(styles.closeButton, theme.closeButton)}
            onClick={this.handleClick}
          >
            {renderIcon(true)}
          </button>
            )
        }
      </React.Fragment>
    );
    return tagContent;
  }

  render() {
    const { data, theme } = this.props;
    const hasDataUrl = data && data.url;

    return (
      <div>
        {
          hasDataUrl ? (
            <a href={data.url} className={cx(styles.tag, theme.tag)}>
              {this.getTooltipContent()}
            </a>
) : (
  <li className={cx(styles.tag, theme.tag)}>
    {this.getTooltipContent()}
  </li>
)
        }
      </div>
    );
  }
}

Tag.propTypes = {
  /** Tags data */
  data: Proptypes.object,
  icon: Proptypes.object,
  onRemove: Proptypes.func,
  /** Tooltip id */
  tooltipId: Proptypes.string,
  /** Label name */
  label: Proptypes.string,
  /** Tag color */
  color: Proptypes.string,
  /** Boolean for a colored icon. Will take the color from the color prop */
  coloredIcon: Proptypes.bool,
  /** Can remove tag option */
  canRemove: Proptypes.bool,
  /** Theming options */
  theme: Proptypes.shape({
    dot: Proptypes.string,
    label: Proptypes.string,
    closeButton: Proptypes.string,
    icon: Proptypes.string,
    tag: Proptypes.string
  })
};

Tag.defaultProps = {
  canRemove: false,
  data: {},
  tooltipId: '',
  icon: dotsIcon,
  onRemove: () => {
  },
  label: '',
  color: '',
  coloredIcon: null,
  theme: {}
};

export default Tag;
