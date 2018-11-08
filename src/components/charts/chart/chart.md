```js
const format = require('d3-format').format;
const data = require('../assets/data.js');

initialState = {
  ...data,
  type: 'line',
  loading: false
};
const handleLegendChange = (filtersSelected) => {
  setState(state => {
    const filterIds = filtersSelected.map(f => f.label);
    const filteredColumns = data.initialYColumns.filter(col => filterIds.includes(col.label));
    const config = {...state.config};
    config.columns.y = filteredColumns;
    return {
      filtersSelected,
      config
    }
  })
}
const getCustomYLabelFormat = value => `${format('.2s')(`${value / 10000}`)}`;
const chartTypes = ['line', 'area', 'percentage'];
const toggleChartType = (filtersSelected) => {
  setState(state => {
    const chartTypeIndex = chartTypes.indexOf(state.type);
    let type = chartTypes[0];
    if (chartTypeIndex + 1 < chartTypes.length) {
      type = chartTypes[chartTypeIndex + 1]
    }
    return { type };
  });
}
<React.Fragment>
  <Button onClick={toggleChartType} >
    Toggle type
  </Button>
  <Chart
    type={state.type}
    config={state.config}
    data={state.data}
    domain={state.domain}
    dataOptions={state.filters}
    dataSelected={state.filtersSelected}
    height={500}
    loading={state.loading}
    onLegendChange={handleLegendChange}
    getCustomYLabelFormat={getCustomYLabelFormat}
  />
</React.Fragment>
```

Example with linear type of line chart
```js
const data = require('../assets/data.js');
initialState = {
  ...data,
  type: 'line',
  loading: false
};
const chartTypes = ['line', 'area', 'percentage'];
const handleLegendChange = (filtersSelected) => {
  setState(state => {
    const filterIds = filtersSelected.map(f => f.label);
    const filteredColumns = data.initialYColumns.filter(col => filterIds.includes(col.label));
    const config = {...state.config};
    config.columns.y = filteredColumns;
    return {
      filtersSelected,
      config
    }
  })
}
const toggleChartType = (filtersSelected) => {
  setState(state => {
    const chartTypeIndex = chartTypes.indexOf(state.type);
    let type = chartTypes[0];
    if (chartTypeIndex + 1 < chartTypes.length) {
      type = chartTypes[chartTypeIndex + 1]
    }
    return { type };
  });
}
<React.Fragment>
  <Button onClick={toggleChartType} >
    Toggle type
  </Button>
  <Chart
    type={state.type}
    config={state.config}
    data={state.data}
    domain={state.domain}
    dataOptions={state.filters}
    dataSelected={state.filtersSelected}
    height={500}
    loading={state.loading}
    onLegendChange={handleLegendChange}
    lineType='linear'
  />
</React.Fragment>
```


Example with projected data
```js
const data = require('../assets/data.js');
const projectedData = require('../assets/projected-data.js');
initialState = {
  ...data,
  config: { ...data.config, ...projectedData.config },
  points: projectedData.points,
  type: 'line',
  loading: false
};
console.log(projectedData, initialState)
const chartTypes = ['line', 'area', 'percentage'];
const handleLegendChange = (filtersSelected) => {
  setState(state => {
    const filterIds = filtersSelected.map(f => f.label);
    const filteredColumns = data.initialYColumns.filter(col => filterIds.includes(col.label));
    const config = {...state.config};
    config.columns.y = filteredColumns;
    return {
      filtersSelected,
      config
    }
  })
}
const toggleChartType = (filtersSelected) => {
  setState(state => {
    const chartTypeIndex = chartTypes.indexOf(state.type);
    let type = chartTypes[0];
    if (chartTypeIndex + 1 < chartTypes.length) {
      type = chartTypes[chartTypeIndex + 1]
    }
    return { type };
  });
}
<React.Fragment>
  <Button onClick={toggleChartType} >
    Toggle type
  </Button>
  <Chart
    type={state.type}
    config={state.config}
    data={state.data}
    points={state.points}
    domain={state.domain}
    dataOptions={state.filters}
    dataSelected={state.filtersSelected}
    height={500}
    loading={state.loading}
    onLegendChange={handleLegendChange}
    lineType='linear'
  />
</React.Fragment>
```


Example with bar chart and passing callback formatting y axis labels
```js
const data = require('../bar-chart/data.js');
const format = require('d3-format').format;
initialState = {
  ...data,
  type: 'bar',
  loading: false
};
const getCustomYLabelFormat = value => `${format('.2s')(`${value / 10000}`)}`;
<React.Fragment>
  <Chart
    type={state.type}
    config={state.config}
    data={state.data}
    domain={state.domain}
    height={500}
    loading={state.loading}
    getCustomYLabelFormat={getCustomYLabelFormat}
  />
</React.Fragment>
```
