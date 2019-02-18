import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipChart from 'components/charts/tooltip-chart';
import Tag from 'components/tag';
import { Tooltip } from 'recharts';
import Sunburst from '@latticejs/recharts-sunburst';
import cx from 'classnames';
import simpleTagTheme from 'components/tag/simple-tag-theme.scss';

import styles from './sunburst-chart-styles.scss';

class SunburstChart extends PureComponent {
  render() {
    const {
      data,
      width,
      height,
      colors,
      customTooltip,
      config,
      theme
    } = this.props;

    const firstLevelLegend = Object
      .keys(config.theme)
      .filter(key => !config.theme[key].nestedLegend);

    return (
      <React.Fragment>
        <Sunburst
          width={width}
          height={height}
          data={data}
          colors={colors}
          dataKey="size"
        >
          <Tooltip
            isAnimationActive={false}
            content={content =>
              customTooltip &&
                React.cloneElement(customTooltip, { content, config }) ||
                <TooltipChart content={content} config={config} />}
            filterNull={false}
          />
        </Sunburst>
        {
          !config.hideLegend && Object.keys(config.theme) && (
          <div
            className={cx(styles.legend, theme.legend)}
            style={{
                  marginLeft: width / (config.legendPositionRatio || 4.75)
                }}
          >
            {firstLevelLegend.map(q => (
              <React.Fragment key={q}>
                <Tag
                  theme={theme.tag || simpleTagTheme}
                  key={config.theme[q].label}
                  canRemove={false}
                  label={config.theme[q].label}
                  color={config.theme[q].stroke}
                />
                {
                      config.theme[q].children &&
                        config.theme[q].children.map(nestedTag => (
                          <div
                            key={nestedTag}
                            className={cx(styles.legend, theme.legend)}
                            style={{
                              marginLeft: width / config.legendPositionRatio +
                                8 ||
                                4.75
                            }}
                          >
                            <Tag
                              theme={theme.tag || simpleTagTheme}
                              key={config.theme[nestedTag].label}
                              canRemove={false}
                              label={config.theme[nestedTag].label}
                              color={config.theme[nestedTag].stroke}
                            />
                          </div>
                        ))
                    }
              </React.Fragment>
                ))}
          </div>
            )
        }
      </React.Fragment>
    );
  }
}

SunburstChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  colors: PropTypes.object,
  customTooltip: PropTypes.node,
  config: PropTypes.object,
  theme: PropTypes.object
};

SunburstChart.defaultProps = {
  data: [],
  width: 500,
  height: 500,
  colors: {},
  customTooltip: null,
  config: {},
  theme: {}
};

export default SunburstChart;
