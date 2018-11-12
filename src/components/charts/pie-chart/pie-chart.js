import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipChart from 'components/charts/tooltip-chart';
import camelCase from 'lodash/camelCase';
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
  { labelPositionRatio }
) =>
  {
    const radius = innerRadius +
      (outerRadius - innerRadius) * (labelPositionRatio || 0.6);
    const x = cx + radius * Math.cos((-midAngle) * RADIAN);
    const y = cy + radius * Math.sin((-midAngle) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
    const { config, data, width, margin, customTooltip } = this.props;

    return (
      <div className={styles.pieChart}>
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
            <Pie
              data={data}
              dataKey="value"
              fill={config.theme && config.theme.fill}
              label={content => CustomizedLabel(content, config)}
              labelLine={false}
              isAnimationActive={config.animation || false}
              legendType="circle"
            >
              {data.map(d => <Cell fill={getColor(d, config)} />)}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
        {
          Object.keys(config.theme) && (
          <div
            className={styles.legend}
            style={{
                  marginLeft: width / (config.legendPositionRatio || 4.75)
                }}
          >
            {Object
                  .keys(config.theme)
                  .map(q => (
                    <Tag
                      theme={simpleTagTheme}
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
    })
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
  customTooltip: PropTypes.node
};

PieChart.defaultProps = {
  width: 600,
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  config: {},
  data: [],
  customTooltip: null
};

export default PieChart;
