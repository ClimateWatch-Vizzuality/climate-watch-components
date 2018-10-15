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
const toggleCharType = (filtersSelected) => {
  setState(state => ({ type: state.type === 'line' ? 'area' : 'line' }))
}
<React.Fragment>
  <Button onClick={toggleCharType} >
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
const toggleCharType = (filtersSelected) => {
  setState(state => ({ type: state.type === 'line' ? 'area' : 'line' }))
}
<React.Fragment>
  <Button onClick={toggleCharType} >
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
