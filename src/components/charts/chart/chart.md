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
