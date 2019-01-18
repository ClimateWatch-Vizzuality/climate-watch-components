```js
const width = 400;

const data = [
  { name: 'groupA', value: 400 },
  { name: 'groupB', value: 300 },
  { name: 'groupC', value: 300 },
  { name: 'groupD', value: 200 },
  { name: 'groupE', value: 278 },
  { name: 'groupF', value: 189 }
];

const config = {
  tooltip: {
    groupA: { label: 'Group A' },
    groupB: { label: 'Group B' },
    groupC: { label: 'Group C' },
    groupD: { label: 'Group D' },
    groupE: { label: 'Group E' },
    groupF: { label: 'Group F' },
  },
  animation: false,
  axes: {
    yLeft: {
      unit: 'MtCO2e',
      label: '2010'
    }
  },
  theme: { // Color of the slices is in the stroke attribute:
    // fill: '#f5b335', // Optional -just if monochrome
    groupA: { label: 'Group A', stroke: 'red' },
    groupB: { label: 'Group B', stroke: 'blue' },
    groupC: { label: 'Group C', stroke: 'teal' },
    groupD: { label: 'Group D', stroke: 'orange' },
    groupE: { label: 'Group E', stroke: 'maroon' },
    groupF: { label: 'Group F', stroke: 'fuchsia' },
  },
};

<PieChart
  data={data}
  width={width}
  config={config}
/>
```
Example with animated pie chart, inner- and outer- radius with hidden label and legend
```js
const width = 400;

const data = [
  { name: 'groupA', value: 400 },
  { name: 'groupB', value: 300 },
  { name: 'groupC', value: 300 },
  { name: 'groupD', value: 200 },
  { name: 'groupE', value: 278 },
  { name: 'groupF', value: 189 }
];

const config = {
  tooltip: {
    groupA: { label: 'Group A' },
    groupB: { label: 'Group B' },
    groupC: { label: 'Group C' },
    groupD: { label: 'Group D' },
    groupE: { label: 'Group E' },
    groupF: { label: 'Group F' },
  },
  animation: true,
  axes: {
    yLeft: {
      unit: 'MtCO2e',
      label: '2010'
    }
  },
  theme: { // Color of the slices is in the stroke attribute:
    // fill: '#f5b335', // Optional -just if monochrome
    groupA: { label: 'Group A', stroke: 'red' },
    groupB: { label: 'Group B', stroke: 'blue' },
    groupC: { label: 'Group C', stroke: 'teal' },
    groupD: { label: 'Group D', stroke: 'orange' },
    groupE: { label: 'Group E', stroke: 'maroon' },
    groupF: { label: 'Group F', stroke: 'fuchsia' },
  },
  innerRadius: 50,
  outerRadius: 80,
  hideLabel: true,
  hideLegend: true
};

<PieChart
  data={data}
  width={width}
  config={config}
/>
```
