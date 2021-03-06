import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from 'components/multiselect';
import Tag from 'components/tag';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import projectedTagTheme from './projected-tag-theme.scss';
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
    let columnKeys = config ? Object.keys(config.columns) : [];
    columnKeys = columnKeys.filter(columnKey => columnKey !== 'x');

    const dataSelectedIds = dataSelected.map(d => d.label);

    const hasColumnsWithKey = key =>
      hasAnyColumns && config.columns[key].length;

    const hasColumns = columnKeys
      .map(key => hasColumnsWithKey(key))
      .some(value => value > 0);

    const filterColumns = key =>
      hasColumnsWithKey(key)
        ? config.columns[key].filter(
          column => dataSelectedIds.includes(column.label)
        )
        : [];
    let filteredColumns = columnKeys.map(key => filterColumns(key));
    filteredColumns = [].concat(...filteredColumns);
    const hasLegendNote = config && config.legendNote;

    const columnsLength = filteredColumns.length;
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
                    fill={config.theme[column.value].fill}
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
                  Click on each scenario to see the assumptions behind it.
            </div>
              )
          }
        </div>
        {
          model && (
          <div className={styles.legendLogo}>
            <div className={styles.legendLogoTitle}>
                  Data provided by:
            </div>
            <a href={model.url} target="_blank" rel="noopener noreferrer">
              <img src={`https:${model.logo}`} alt="Data provider logo" />
            </a>
          </div>
            )
        }
        {
          config && config.projectedColumns && (
          <div
            className={cx(styles.projectedLegend, theme.projectedLegend)}
          >
            {config.projectedColumns.map(q => (
              <Tag
                theme={projectedTagTheme}
                key={q.label}
                canRemove={false}
                label={q.label}
                color={q.color}
                data={q}
              />
                ))}
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
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    projectedLegend: PropTypes.string,
    tags: PropTypes.string
  })
};

LegendChart.defaultProps = {
  dataSelected: {},
  dataOptions: {},
  hideRemoveOptions: false,
  model: null,
  theme: {}
};

export default LegendChart;
