```js
const height = 400;

const data = [
  { name: 'GroupA', value: 400, fill: 'red' },
  { name: 'GroupB', value: 300, fill: 'blue' },
  { name: 'GroupC', value: 300, fill: 'yellow' },
  { name: 'GroupD', value: 200, fill: 'orange' },
  { name: 'GroupE', value: 278, fill: 'maroon' },
  { name: 'GroupF', value: 189, fill: 'fuchsia' }
];

const config = {
  tooltip: {
    GroupA: { label: 'Group A' },
    GroupB: { label: 'Group B' },
    GroupC: { label: 'Group C' },
    GroupD: { label: 'Group D' },
    GroupE: { label: 'Group E' },
    GroupF: { label: 'Group F' },
  },
  animation: false,
  axes: {
    yLeft: {
      unit: 'MtCO2e',
      label: '2010'
    }
  },
  theme: {
    stroke: '',
    fill: '#f5b335',
    GroupA: { label: 'Group A', stroke: 'red' },
    GroupB: { label: 'Group B', stroke: 'blue' },
    GroupC: { label: 'Group C', stroke: 'yellow' },
    GroupD: { label: 'Group D', stroke: 'orange' },
    GroupE: { label: 'Group E', stroke: 'maroon' },
    GroupF: { label: 'Group F', stroke: 'fuchsia' },
  }
};

<PieChart
  data={data}
  height={height}
  config={config}
/>
```
