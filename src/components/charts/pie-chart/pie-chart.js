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
import CustomizedActiveShape from './customized-active-shape';
import CustomizedLabel from './customized-label';

const getColor = (d, config) => {
  const configD = config.theme[camelCase(d.name)];
  return configD && configD.stroke || d.fill;
};

class PieChart extends PureComponent {
  constructor() {
    super();
    this.state = { activeIndex: 0 };
  }

  render() {
    const { config, data, width, margin, customTooltip, theme } = this.props;
    const { activeIndex } = this.state;
    const isMultilevelPieChart = !Array.isArray(data);

    const onPieEnter = (d, index) => {
      this.setState({ activeIndex: index });
    };
    return (
      <div className={classnames(styles.pieChart, theme.pieChart)}>
        <ResponsiveContainer width={width} aspect={4 / 3}>
          <RechartsPieChart margin={margin}>
            <Tooltip
              isAnimationActive={false}
              content={content =>
                customTooltip &&
                  React.cloneElement(customTooltip, { content, config }) ||
                  <TooltipChart content={content} config={config} />}
              offset={config.innerHoverLabel ? 80 : undefined}
              filterNull={false}
            />
            {
              isMultilevelPieChart ? Object.keys(data).map(key => (
                <Pie
                  key={key}
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
                )) : (
                  <Pie data={data} dataKey="value" fill={config.theme && config.theme.fill} label={content => CustomizedLabel(content, config, theme)} labelLine={false} activeShape={config.innerHoverLabel ? props => <CustomizedActiveShape innerHoverLabel={config.innerHoverLabel} theme={theme} {...props} /> : undefined} activeIndex={activeIndex} onMouseEnter={onPieEnter} isAnimationActive={config.animation || false} legendType="circle" innerRadius={config.innerRadius} outerRadius={config.outerRadius} cx={config.cx} cy={config.cy}>
                    {data.map(d => (
                      <Cell key={d.name} fill={getColor(d, config)} />
                  ))}
                  </Pie>
)
            }
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
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        fill: PropTypes.string
      })
    ),
    PropTypes.object
  ]),
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
    tag: PropTypes.oneOfType([ PropTypes.shape(), PropTypes.string ]),
    innerHoverLabel: PropTypes.oneOfType([
      PropTypes.shape(),
      PropTypes.string
    ])
  })
};

PieChart.defaultProps = {
  width: 600,
  margin: { top: 0, right: 10, left: 10, bottom: 0 },
  config: {
    innerRadius: 0,
    innerHoverLabel: false,
    outerRadius: null,
    hideLabel: false,
    hideLegend: false
  },
  data: [],
  customTooltip: null,
  theme: {}
};

export default PieChart;
