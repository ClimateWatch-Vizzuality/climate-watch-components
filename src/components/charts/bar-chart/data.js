export const data = [
  { x: '0-4', y: 8090282 },
  { x: '5-9', y: 8890282 },
  { x: '10-14', y: 8090282 },
  { x: '15-18', y: 8000282 },
  { x: '19-24', y: 9090282 },
  { x: '25-29', y: 8090282 }
];

export const domain = { x: [ 'auto', 'auto' ], y: [ 0, 'auto' ] };

export const config = {
  axes: {
    xBottom: { name: 'Age distribution', unit: '', format: 'string' },
    yLeft: { name: 'Number of people', unit: '', format: 'number' }
  },
  tooltip: { y: { label: 'people' } },
  animation: false,
  columns: {
    x: [ { label: 'year', value: 'x' } ],
    y: [ { label: '', value: 'y' } ]
  },
  theme: { y: { stroke: '', fill: '#f5b335' } }
};
