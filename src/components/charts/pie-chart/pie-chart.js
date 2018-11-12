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
  { cx, cy, midAngle, innerRadius, outerRadius, percent }
) =>
  {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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

class PieChart extends PureComponent {
  render() {
    const {
      config,
      data,
      width,
      margin,
      customTooltip,
      legendPositionRatio
    } = this.props;
    const getColor = d => {
      const configD = config.theme[camelCase(d.name)];
      return configD && configD.stroke || d.fill;
    };
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
              label={CustomizedLabel}
              labelLine={false}
              isAnimationActive={config.animation || false}
              legendType="circle"
            >
              {data.map(d => <Cell fill={getColor(d)} />)}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
        {
          Object.keys(config.theme) && (
          <div
            className={styles.legend}
            style={{ marginLeft: width / legendPositionRatio }}
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
  customTooltip: PropTypes.node,
  legendPositionRatio: PropTypes.number
};

PieChart.defaultProps = {
  width: 600,
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  config: {},
  data: [],
  customTooltip: null,
  legendPositionRatio: 4.75
};

export default PieChart;
