```js
const data = require('../assets/data.js');
initialState = {
  ...data,
  loading: false
};
const handleLegendChange = (filtersSelected) => {
  setState(state => {
    const filterIds = filtersSelected.map(f => f.label);
    const filteredWColumns = data.initialWColumns.filter(col => filterIds.includes(col.label));
    const filteredZColumns = data.initialZColumns.filter(col => filterIds.includes(col.label));
    const filteredTColumns = data.initialTColumns.filter(col => filterIds.includes(col.label));
    const filteredYColumns = data.initialYColumns.filter(col => filterIds.includes(col.label));

    const config = {...state.config};
    config.columns.y = filteredYColumns;
    config.columns.w = filteredWColumns;
    config.columns.z = filteredZColumns;
    config.columns.t = filteredTColumns;
    return {
      filtersSelected,
      config
    }
  })
}
<LineDottedLineAreaComposedChart
    config={state.config}
    data={state.data}
    domain={state.domain}
    dataOptions={state.filters}
    dataSelected={state.filtersSelected}
    height={500}
    loading={state.loading}
    onLegendChange={handleLegendChange}
/>
```
