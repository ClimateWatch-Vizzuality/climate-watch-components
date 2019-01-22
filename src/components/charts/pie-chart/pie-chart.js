import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipChart from 'components/charts/tooltip-chart';
import camelCase from 'lodash/camelCase';
import classnames from 'classnames';
import Tag from 'components/tag';
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import simpleTagTheme from 'components/tag/simple-tag-theme.scss';
import styles from './pie-chart-styles.scss';

const RADIAN = Math.PI / 180;
const CustomizedLabel = (
  { cx, cy, midAngle, innerRadius, outerRadius, percent },
  { labelPositionRatio, hideLabel },
  theme
) =>
  {
    const radius = innerRadius +
      (outerRadius - innerRadius) * (labelPositionRatio || 0.6);
    const x = cx + radius * Math.cos((-midAngle) * RADIAN);
    const y = cy + radius * Math.sin((-midAngle) * RADIAN);

    return !hideLabel
      ? (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          className={theme.label}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
)
      : null;
  };

CustomizedLabel.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired
};

const getColor = (d, config) => {
  const configD = config.theme[camelCase(d.name)];
  return configD && configD.stroke || d.fill;
};

class PieChart extends PureComponent {
  render() {
    const { config, data, width, margin, customTooltip, theme } = this.props;
    return (
      <div className={classnames(styles.pieChart, theme.pieChart)}>
        <ResponsiveContainer width={width} aspect={4 / 3} margin={margin}>
          <RechartsPieChart>
            <Tooltip
              isAnimationActive={false}
              content={content =>
                customTooltip &&
                  React.cloneElement(customTooltip, { content, config }) ||
                  <TooltipChart content={content} config={config} />}
              filterNull={false}
            />
            {Object.keys(data).map(key => (
              <Pie
                data={data[key]}
                dataKey="value"
                outerRadius={config.radius[key].outerRadius}
                innerRadius={config.radius[key].innerRadius}
                fill={config.theme && config.theme.fill}
                label={content => CustomizedLabel(content, config, theme)}
                labelLine={false}
                isAnimationActive={config.animation || false}
                legendType="circle"
                cx={config.cx}
                cy={config.cy}
              >
                {data[key].map(d => (
                  <Cell key={d.name} fill={getColor(d, config)} />
                ))}
              </Pie>
            ))}
          </RechartsPieChart>
        </ResponsiveContainer>
        {
          !config.hideLegend && Object.keys(config.theme) && (
          <div
            className={classnames(styles.legend, theme.legend)}
            style={{
                  marginLeft: width / (config.legendPositionRatio || 4.75)
                }}
          >
            {Object
                  .keys(config.theme)
                  .map(q => (
                    <Tag
                      theme={theme.tag || simpleTagTheme}
                      key={config.theme[q].label}
                      canRemove={false}
                      label={config.theme[q].label}
                      color={config.theme[q].stroke}
                    />
                  ))}
          </div>
            )
        }
      </div>
    );
  }
}

PieChart.propTypes = {
  config: PropTypes.shape({
    /** Position ratio of the legend to the chart, default: 4.75 */
    legendPositionRatio: PropTypes.number,
    /** Position ratio of the label to the chart, default: 0.6 */
    labelPositionRatio: PropTypes.number,
    columns: PropTypes.object,
    /** Color of the slices is in the stroke attribute:
     * columnName: { stroke: 'red'}.
     * Optional fill attribute - Only if the pie is monochrome */
    theme: PropTypes.shape({
      // column: PropTypes.object
      fill: PropTypes.string
    }),
    /** Set inner radius of the chart */
    innerRadius: PropTypes.number,
    /** Set outer radius of the chart */
    outerRadius: PropTypes.number,
    /** hide values on the chart */
    hideLabel: PropTypes.bool,
    /** hide legend component */
    hideLegend: PropTypes.bool
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      fill: PropTypes.string.isRequired
    })
  ),
  width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number
  }),
  customTooltip: PropTypes.node,
  theme: PropTypes.shape({
    pieChart: PropTypes.oneOfType([ PropTypes.shape(), PropTypes.string ]),
    legend: PropTypes.oneOfType([ PropTypes.shape(), PropTypes.string ]),
    label: PropTypes.oneOfType([ PropTypes.shape(), PropTypes.string ]),
    tag: PropTypes.oneOfType([ PropTypes.shape(), PropTypes.string ])
  })
};

PieChart.defaultProps = {
  width: 600,
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  config: {},
  data: [],
  customTooltip: null,
  theme: {},
  innerRadius: 0,
  outerRadius: null,
  hideLabel: false,
  hideLegend: false
};

export default PieChart;
