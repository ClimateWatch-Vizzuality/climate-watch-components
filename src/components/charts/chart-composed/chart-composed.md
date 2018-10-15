```js
const data = require('../assets/data-for-composed-chart.js');
const Line = require('recharts').Line;
const Area = require('recharts').Area;
const isUndefined = require('lodash/isUndefined');
const format = require('d3-format').format;

initialState = {
  ...data,
  loading: false
};

const config = { ...state.config };

const handleLegendChange = (filtersSelected) => {
  setState(state => {
    const filterIds = filtersSelected.map(f => f.label);
    const filteredLineWithDotsColumns = data.initialLineWithDotsColumns.filter(col => filterIds.includes(col.label));
    const filteredRangedAreaColumns = data.initialRangedAreaColumns.filter(col => filterIds.includes(col.label));
    const filteredDotsColumns = data.initialDotsColumns.filter(col => filterIds.includes(col.label));
    const filteredLineColumns = data.initialLineColumns.filter(col => filterIds.includes(col.label));

    const config = {...state.config};
    config.columns.lineWithDots = filteredLineWithDotsColumns;
    config.columns.rangedArea = filteredRangedAreaColumns;
    config.columns.dots = filteredDotsColumns;
    config.columns.line = filteredLineColumns;
    return {
      filtersSelected,
      config
    }
  })
}
const rangedArea = config.columns && config.columns.rangedArea.map(column => {
                  const color = config.theme[column.value].stroke || '';
                  return (
                    <Area
                      key={column.value}
                      dataKey={column.value}
                      dot={false}
                      stroke={color}
                      strokeWidth={2}
                      isAnimationActive={
                        isUndefined(config.animation) ? true : config.animation
                      }
                      fill={config.theme[column.value].fill || ''}
                      type="linear"
                    />
                  );
                });

const lineChart = config.columns.line.map(column => {
                  const color = config.theme[column.value].stroke || '';
                  return (
                    <Line
                      key={column.value}
                      isAnimationActive={
                        isUndefined(config.animation) ? true : config.animation
                      }
                      dot={false}
                      dataKey={column.value}
                      stroke={color}
                      strokeWidth={2}
                      type="monotone"
                    />
                  );
                });

const dotsLine = config.columns &&
                config.columns.dots.map(column => (
                  <Line
                    key={column.value}
                    isAnimationActive={
                      isUndefined(config.animation) ? true : config.animation
                    }
                    dataKey={column.value}
                    stroke="#000000"
                    strokeDasharray="1,09"
                    strokeWidth="5"
                    strokeLinecap="round"
                    type="monotone"
                  />
                ));

const lineWithDots = config.columns && config.columns.lineWithDots.map(column => {
                  const color = config.theme[column.value].stroke || '';
                  return (
                    <Line
                      key={column.value}
                      isAnimationActive={
                        isUndefined(config.animation) ? true : config.animation
                      }
                      dot={{ strokeWidth: 0, fill: color, radius: 0.5 }}
                      dataKey={column.value}
                      stroke={color}
                      strokeWidth={2}
                      type="monotone"
                    />
                  );
                });

<ChartComposed
    config={state.config}
    data={state.data}
    domain={state.domain}
    dataOptions={state.filters}
    dataSelected={state.filtersSelected}
    height={500}
    loading={state.loading}
    onLegendChange={handleLegendChange}
>
  {lineChart}
  {rangedArea}
</ChartComposed>
```

Example with area as a background color for chart
```js
const data = require('../assets/data-with-grey-area.json');
const Line = require('recharts').Line;
const Area = require('recharts').Area;
const isUndefined = require('lodash/isUndefined');

initialState = {
  ...data,
  loading: false
};


const lineChart = (
  <Line
    key="yG"
    dataKey="yG"
    isAnimationActive={false}
    dot={false}
    stroke="#0E9560"
    type="linear"
    strokeWidth={2}
  />
);

const greyArea = (
  <Area
    key='greyArea'
    dataKey='greyArea'
    dot={false}
    stroke="#F6F8F8"
    strokeWidth={2}
    isAnimationActive={true}
    fill="#F6F8F8"
    type="linear"
  />
);

<ChartComposed
  config={state.config}
  data={state.data}
  domain={state.domain}
  dataOptions={state.filters}
  dataSelected={state.filtersSelected}
  height={500}
  loading={state.loading}
  areaAsBackgroundForCartesianGrid={greyArea}
>
  {lineChart}
</ChartComposed>

```
