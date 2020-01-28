Example with simple Pie Chart
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

Example with multilevel Pie Chart
```js
const width = 400;

const data1 = [
  { name: 'groupA', value: 400 },
  { name: 'groupB', value: 300 },
  { name: 'groupC', value: 300 },
  { name: 'groupD', value: 200 },
  { name: 'groupE', value: 278 },
  { name: 'groupF', value: 189 }
];

const data2 = [
  { name: 'gA1', value: 200 },
  { name: 'gA2', value: 200 },
  { name: 'gB1', value: 100 },
  { name: 'gB2', value: 200 },
  { name: 'gC1', value: 150 },
  { name: 'gC2', value: 150 },
  { name: 'gD1', value: 50 },
  { name: 'gD2', value: 150 },
  { name: 'gE1', value: 270 },
  { name: 'gE2', value: 8 },
  { name: 'gF1', value: 170 },
  { name: 'gF2', value: 19 }
];

const data = { d1: data1, d2: data2 };

const config = {
  tooltip: {
    groupA: { label: 'Group A' },
    groupB: { label: 'Group B' },
    groupC: { label: 'Group C' },
    groupD: { label: 'Group D' },
    groupE: { label: 'Group E' },
    groupF: { label: 'Group F' },
    gA1: { label: 'A1' },
    gA2: { label: 'A2' },
    gB1: { label: 'B1' },
    gB2: { label: 'B2' },
    gC1: { label: 'C1' },
    gC2: { label: 'C2' },
    gD1: { label: 'D1' },
    gD2: { label: 'D2' },
    gE1: { label: 'E1' },
    gE2: { label: 'E2' },
    gF1: { label: 'F1' },
    gF2: { label: 'F2' }
  },
  animation: false,
  axes: {
    yLeft: {
      unit: 'MtCO2e',
      label: '2010'
    }
  },
  radius: {
    d1: {
      outerRadius: 80,
      innerRadius: 30
    },
    d2: {
      innerRadius: 85,
      outerRadius: 150
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
    gA1: { label: 'A1', stroke: 'pink' },
    gA2: { label: 'A2', stroke: 'pink' },
    gB1: { label: 'B1', stroke: 'green' },
    gB2: { label: 'B2', stroke: 'green' },
    gC1: { label: 'C1', stroke: 'gray' },
    gC2: { label: 'C2', stroke: 'gray' },
    gD1: { label: 'D1', stroke: 'yellow' },
    gD2: { label: 'D2', stroke: 'yellow' },
    gE1: { label: 'E1', stroke: 'brown' },
    gE2: { label: 'E2', stroke: 'brown' },
    gF1: { label: 'F1', stroke: 'black' },
    gF2: { label: 'F2', stroke: 'black' }
  },
  hideLabel: true,
  hideLegend: true
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

Example with animated pie chart, with inner hover label and extended hovered sector
```js

const theme = require('./pie-chart-theme.scss');
const width = 400;

const data = [
  { name: 'groupA', value: 400 },
  { name: 'groupB', value: 300 },
  { name: 'groupC', value: 300 },
  { name: 'groupD', value: 200 },
  { name: 'groupE', value: 278 },
  { name: 'groupF', value: 189 }
];
const customInnerHoverLabel = ({ x, y, value }) => (
    <text
      x={x}
      y={y - 18}
    >
      <tspan
        x={x}
        textAnchor="middle"
      >
        {Math.round(value * 10) / 10} %
      </tspan>
      <tspan
        x={x}
        textAnchor="middle"
        dy="20"
      >
        of global
      </tspan>
      <tspan
        x={x}
        textAnchor="middle"
        dy="20"
      >
        emissions.
      </tspan>
    </text>
  );
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
  innerHoverLabel: { offset: 80 },
  outerRadius: 80,
  hideLabel: true,
  hideLegend: true
};

<PieChart
  data={data}
  width={width}
  config={config}
  customInnerHoverLabel={customInnerHoverLabel}
  theme={theme}
/>
```
