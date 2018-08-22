```js
const data = require('../assets/data-for-composed-chart.js');
initialState = {
  ...data,
  loading: false
};
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
