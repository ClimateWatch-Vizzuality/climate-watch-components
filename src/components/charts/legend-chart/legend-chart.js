import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from 'components/multiselect';
import Tag from 'components/tag';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';

import styles from './legend-chart-styles.scss';
import plusIcon from '../assets/plus.svg';

class LegendChart extends PureComponent {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  handleRemove = label => {
    const { dataSelected, onChange } = this.props;
    const newFilters = dataSelected.filter(d => d.label !== label);
    onChange(newFilters);
  };

  render() {
    const {
      config,
      dataOptions,
      dataSelected,
      model,
      onChange,
      hideRemoveOptions,
      theme
    } = this.props;
    const shouldShowMultiselect = dataOptions &&
      dataSelected &&
      dataSelected.length !== dataOptions.length;
    const mirrorX = dataSelected.length < 2;
    const hasAnyColumns = config && config.columns;
    const hasYColumns = hasAnyColumns && config.columns.y.length;
    const hasWColumns = hasAnyColumns && config.columns.w.length;
    const hasZColumns = hasAnyColumns && config.columns.z.length;
    const hasTColumns = hasAnyColumns && config.columns.t.length;
    const hasColumns = hasYColumns || hasWColumns || hasZColumns || hasTColumns;
    const dataSelectedIds = dataSelected.map(d => d.label);

    const filteredYColumns = hasYColumns
      ? config.columns.y.filter(
        column => dataSelectedIds.includes(column.label)
      )
      : [];

    const filteredWColumns = hasWColumns
      ? config.columns.w.filter(
        column => dataSelectedIds.includes(column.label)
      )
      : [];

    const filteredZColumns = hasZColumns
      ? config.columns.z.filter(
        column => dataSelectedIds.includes(column.label)
      )
      : [];

    const filteredTColumns = hasTColumns
      ? config.columns.t.filter(
        column => dataSelectedIds.includes(column.label)
      )
      : [];

    const filteredColumns = [
      ...filteredYColumns,
      ...filteredWColumns,
      ...filteredZColumns,
      ...filteredTColumns
    ];

    const hasLegendNote = config && config.legendNote;

    const columnsLength = [
      ...config.columns.y,
      ...config.columns.w,
      ...config.columns.z,
      ...config.columns.t
    ].length;
    return (
      <div className={cx(styles.legendChart, theme.wrapper)}>
        <div className={styles.legendContainer}>
          <div className={styles.tagsContainer}>
            <div className={styles.tagsWrapper}>
              <ul className={cx(styles.tags, theme.tags)}>
                {filteredColumns.map(column => (
                  <Tag
                    theme={{ tag: styles.tag }}
                    key={`${column.value}`}
                    data={{
                      id: column.value,
                      url: column.url || null,
                      title: column.legendTooltip || null
                    }}
                    label={column.label}
                    color={config.theme[column.value].stroke}
                    icon={config.theme[column.value].icon}
                    tooltipId="legend-tooltip"
                    onRemove={this.handleRemove}
                    canRemove={hideRemoveOptions ? false : columnsLength > 1}
                  />
                ))}
                {hasColumns && <ReactTooltip id="legend-tooltip" />}
                {
                  shouldShowMultiselect &&
                    (
                      <MultiSelect
                        theme={{ wrapper: styles.tagSelector }}
                        values={dataSelected || []}
                        options={dataOptions || []}
                        onValueChange={onChange}
                        hideResetButton
                        closeOnSelect
                        dropdownDirection={-1}
                        hideSelected
                        icon={plusIcon}
                        mirrorX={mirrorX}
                      />
                    )
                }
              </ul>
            </div>
          </div>
          {
            hasLegendNote && (
            <div className={styles.tagDescription}>
                  Click on each scenarios to see the assumptions behind it.
            </div>
              )
          }
        </div>
        {
          model && (
          <div className={styles.legendLogo}>
            <div className={styles.legendLogoTitle}>Data provided by:</div>
            <a href={model.url} target="_blank" rel="noopener noreferrer">
              <img src={`https:${model.logo}`} alt="Data provider logo" />
            </a>
          </div>
            )
        }
      </div>
    );
  }
}

LegendChart.propTypes = {
  dataOptions: PropTypes.array,
  dataSelected: PropTypes.array,
  config: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  model: PropTypes.shape({ url: PropTypes.string, logo: PropTypes.string }),
  hideRemoveOptions: PropTypes.bool,
  theme: PropTypes.shape({ wrapper: PropTypes.string, tags: PropTypes.string })
};

LegendChart.defaultProps = {
  dataSelected: {},
  dataOptions: {},
  hideRemoveOptions: false,
  model: null,
  theme: {}
};

export default LegendChart;
