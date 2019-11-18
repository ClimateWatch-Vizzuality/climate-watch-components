import min from 'lodash/min';
import max from 'lodash/max';
import isArray from 'lodash/isArray';
import uniq from 'lodash/uniq';
import { createSelector } from 'reselect';
import {
  scaleDiscontinuous,
  discontinuityRange
} from '@d3fc/d3fc-discontinuous-scale';
import { scaleTime } from 'd3-scale';

const getData = state => state.data || null;
const getProjectedData = state => state.projectedData || null;
const getConfig = state => state.config || null;

export const getDataWithTotal = createSelector([ getData, getConfig ], (
  data,
  config
) =>
  {
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
  });

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
  [ getData, getConfig, getProjectedData, getDataMin, getDataMax ],
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

export const getDiscontinousScale = createSelector(
  [ getData, getProjectedData ],
  (data, projectedData) => {
    if (!data || !data.length || !projectedData || !projectedData.length)
      return null;

    const firstValueYear = data[0].x;
    const lastValueYear = data[data.length - 1].x;
    const projectedDataYears = uniq(projectedData.map(d => d.x));
    const allYears = [ lastValueYear, ...projectedDataYears ];
    const dataYearsSpan = lastValueYear - firstValueYear;

    // make the target to be min of 15% of data years span close
    const beforeTargetInterval = Math.ceil(0.15 * dataYearsSpan);
    const omitYearRanges = allYears
      .slice(1)
      .map((y, index) => [
        allYears[index],
        allYears[index + 1] - beforeTargetInterval
      ])
      .filter(range => range[1] > range[0]);

    // filter out wrong ranges
    return scaleDiscontinuous(
      scaleTime()
    ).discontinuityProvider(discontinuityRange(...omitYearRanges));
  }
);
