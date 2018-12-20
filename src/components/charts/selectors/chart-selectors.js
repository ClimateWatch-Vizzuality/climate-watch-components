import min from 'lodash/min';
import max from 'lodash/max';
import isArray from 'lodash/isArray';
import { createSelector } from 'reselect';

const getData = state => state.data || null;
export const getDataWithTotal = createSelector(
  [ getData, state => state.config ],
  (data, config) => {
    if (!data || !config) return null;
    return data.map(d => {
      let total = null;
      config.columns.y.forEach(column => {
        if (d[column.value] && !column.hideData) {
          if (!total) total = 0;
          total += d[column.value];
        }
      });
      return { ...d, total };
    });
  }
);

const getDataMin = createSelector(getDataWithTotal, data => {
  if (!data) return null;
  return min(
    data.map(d => {
      let negativeSum = 0;
      Object.keys(d).forEach(key => {
        if (key !== 'x' && key !== 'total' && d[key] < 0) negativeSum += d[key];
      });
      return negativeSum;
    })
  );
});

const getDataMax = createSelector(getDataWithTotal, data => {
  if (!data) return null;
  return max(
    data.map(d => {
      let positiveSum = 0;
      Object.keys(d).forEach(key => {
        if (key !== 'x' && key !== 'total' && d[key] > 0) positiveSum += d[key];
      });
      return positiveSum;
    })
  );
});

export const getDomain = createSelector(
  [
    getData,
    state => state.config,
    state => state.projectedData,
    getDataMin,
    getDataMax
  ],
  (data, config, projectedData, dataMin, dataMax) => {
    if (!data || !config) return null;
    const domain = { x: [ 'dataMin', 'dataMax' ], y: [ 'auto', 'auto' ] };
    if (!projectedData || projectedData.length === 0) return domain;
    const projectedDataMax = max(
      projectedData
        .filter(p => p.y)
        .map(p => isArray(p.y) ? max(p.y) : p.y)
    );
    const projectedDataMin = min(
      projectedData
        .filter(p => p.y)
        .map(p => isArray(p.y) ? min(p.y) : p.y)
    );
    domain.x[1] = max(
      projectedData
        .filter(p => p.x)
        .map(p => p.x)
    ) + 1;
    domain.y[0] = projectedDataMin || dataMin;
    domain.y[1] = projectedDataMax || dataMax;
    return domain;
  }
);

export const getDataMaxMin = createSelector([ getDataMin, getDataMax ], (
  dataMin,
  dataMax
) => ({ max: dataMax, min: dataMin }));
