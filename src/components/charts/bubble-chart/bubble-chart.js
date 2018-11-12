import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { pack, hierarchy } from 'd3-hierarchy';
import { format } from 'd3-format';
import cx from 'classnames';
import styles from './bubble-chart-styles.scss';

class BubbleChart extends PureComponent {
  componentDidUpdate() {
    setTimeout(
      () => {
        ReactTooltip.rebuild();
      },
      100
    );
  }

  chartDataCalculation = (width, data) => {
    const diameter = width - 10;
    const bubble = pack().size([ diameter, diameter ]).padding(1.5);
    const parsedData = { name: 'themes', children: data };
    const root = hierarchy(parsedData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    return bubble(root);
  };

  formatValue = (value, unit, { scale, suffix, format: f }) =>
    `${format(f)(value * scale)}${suffix} ${unit}`;

  getTooltipText = ({ tooltipContent, value, unit }, config) => {
    if (tooltipContent && tooltipContent.length) {
      const formattedContent = tooltipContent.map(
        v => typeof v === 'number' ? this.formatValue(v, unit, config) : v
      );
      return formattedContent.join('<br>');
    }
    return this.formatValue(value, unit, config);
  };

  render() {
    const {
      width,
      height,
      handleNodeClick,
      data,
      tooltipClassName,
      theme,
      config
    } = this.props;
    const charData = data && this.chartDataCalculation(width, data);
    return (
      <Fragment>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {
            charData && charData.children.map(d => (
              <g
                key={d.value}
                transform={`translate(${d.x},${d.y})`}
                onClick={e => handleNodeClick(e, d.data.id)}
              >
                <circle
                  r={d.r}
                  data-for="chartTooltip"
                  data-tip={this.getTooltipText(d.data, config)}
                  fill={d.data.color}
                  className={cx(styles.circle, theme.circle)}
                />
              </g>
              ))
          }
        </svg>
        <ReactTooltip
          place="left"
          id="chartTooltip"
          className={cx(styles.tooltip, tooltipClassName)}
          multiline
        />
      </Fragment>
    );
  }
}

BubbleChart.propTypes = {
  /** Defines the with of the svg element containing the chart */
  width: PropTypes.number.isRequired,
  /** Defines the height of the svg element containing the chart */
  height: PropTypes.number.isRequired,
  /** Handler for the click event triggered on each bubble */
  handleNodeClick: PropTypes.func.isRequired,
  /** Array of objects with the config for each bubble */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      id: PropTypes.number,
      tooltipContent: PropTypes.arrayOf(
        PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
      ),
      /** Color prop accepts any valid color string on the svg spec
       * (HEX, RGB, RGBa, HSL, HSLa, named colors) */
      color: PropTypes.string
    })
  ).isRequired,
  config: PropTypes.shape({
    scale: PropTypes.number,
    suffix: PropTypes.string,
    format: PropTypes.string
  }),
  tooltipClassName: PropTypes.string,
  /** Theming circles with customized styles */
  theme: PropTypes.shape({ circle: PropTypes.string })
};

BubbleChart.defaultProps = {
  theme: {},
  tooltipClassName: 'bubbleChartTooltip',
  config: PropTypes.shape({ scale: 1, suffix: '', format: '~r' })
};

export default BubbleChart;
