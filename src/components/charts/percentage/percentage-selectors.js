import { createSelector } from 'reselect';

const selectData = state => state.data || null;
export const getData = createSelector([ selectData, state => state.config ], (
  data,
  config
) =>
  {
    if (!data || !config) return null;
    return data.map(d => {
      const updatedD = { ...d };
      let total = 0;
      config.columns.y.forEach(key => {
        if (d[key.value]) total += d[key.value];
      });
      config.columns.y.map(key => {
        updatedD[key.value] = total ? d[key.value] / total * 100 : null;
        return updatedD[key.value];
      });
      return updatedD;
    });
  });
