```js

const margin = 10;
const height = 400;

const data = [
  { name: 'Group A', value: 400, fill: 'red' },
  { name: 'Group B', value: 300, fill: 'blue' },
  { name: 'Group C', value: 300,  fill: 'yellow' },
  { name: 'Group D', value: 200,  fill: 'orange' },
  { name: 'Group E', value: 278,  fill: 'maroon' },
  { name: 'Group F', value: 189, fill: 'fuchsia' }
];

const config = {
  tooltip: { y: { label: 'people' } },
  animation: false,
  // theme: { stroke: '', fill: '#f5b335' } Only for data without colors
};

<PieChart
  data={data}
  margin={margin}
  height={height}
  config={config}
/>
```
