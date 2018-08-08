Example of line chart
```js
const data = require('../assets/data.js');
initialState = {
  ...data,
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
<React.Fragment>
  <Chart
    type="line"
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
