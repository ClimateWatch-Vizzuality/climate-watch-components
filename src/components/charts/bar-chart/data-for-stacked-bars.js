export const data = [
  { x: '0-4', y: 8090282, yTwo: 8090320 },
  { x: '5-9', y: 8890282, yTwo: 889000 },
  { x: '10-14', y: 8090282, yTwo: 8890140 },
  { x: '15-18', y: 8000282, yTwo: 8890100 },
  { x: '19-24', y: 9090282, yTwo: 8890400 },
  { x: '25-29', y: 8090282, yTwo: 8890200 }
];

export const domain = { x: [ 'auto', 'auto' ], y: [ 0, 'auto' ] };

export const config = {
  axes: {
    xBottom: {
      name: 'Age distribution',
      unit: 'age',
      format: 'string',
      label: { dx: 0, dy: 0, className: '' }
    },
    yLeft: {
      name: 'Number of people',
      unit: 'people',
      format: 'number',
      label: { dx: 2, dy: 14, className: '' }
    }
  },
  tooltip: { y: { label: 'people' }, yTwo: { label: 'dogs' } },
  animation: false,
  columns: {
    x: [ { label: 'year', value: 'x' } ],
    y: [
      { label: 'y', value: 'y', stackId: 'stackA' },
      { label: 'yTwo', value: 'yTwo', stackId: 'stackA' }
    ]
  },
  theme: {
    y: { stroke: '', fill: '#f5b335' },
    yTwo: { stroke: '', fill: '#00B4D2' }
  }
};
