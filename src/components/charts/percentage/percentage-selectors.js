import { createSelector } from 'reselect';

const selectData = state => state.data || null;
export const getData = createSelector([ selectData, state => state.config ], (
  data,
  config
) =>
  {
    if (!data || !config) return null;

    return data.map(d => {
      const updatedD = {};
      let total = 0;
      const columns = config.columns.y.filter(c => !c.hideData);
      columns.forEach(column => {
        if (d[column.value]) total += d[column.value];
      });
      columns.forEach(column => {
        updatedD[column.value] = total ? d[column.value] / total * 100 : null;
      });
      return { x: d.x, ...updatedD };
    });
  });
