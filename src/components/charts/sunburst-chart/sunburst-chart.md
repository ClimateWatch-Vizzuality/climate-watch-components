```js
const data = [
  {
    name: 'Dogs',
    children: [
      { name: 'Retrievers', size: 698 },
      { name: 'German Shephards', size: 5569 },
      { name: 'Puddles', size: 2247 }
    ]
  },
  { name: 'Cats', size: 11275 },
  { name: 'Turtles', size: 7147 }
];

const colors = {
  Dogs: '#F2A03D',
  Cats: '#ED7439',
  Turtles: '#F7C84A',
  Retrievers: '#F5B76D',
  'German Shephards': '#EC8810',
  Puddles: '#F7C385'
};

const config = {
  tooltip: {
    Dogs: { label: 'Dogs' },
    Cats: { label: 'Cats' },
    Turtles: { label: 'Turtles' },
    Retrievers: { label: 'Retrievers' },
    'German Shephards': { label: 'German Shephards' },
    Puddles: { label: 'Puddles' }
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
    Dogs: { label: 'Dogs', stroke: '#F2A03D', children: [ 'Retrievers', 'German Shephards', 'Puddles' ] },
    Cats: { label: 'Cats', stroke: '#ED7439' },
    Turtles: { label: 'Turtles', stroke: '#F7C84A' },
    Retrievers: { label: 'Retrievers', stroke: '#F5B76D', nestedLegend: true },
    'German Shephards': { label: 'German Shephards', stroke: '#EC8810', nestedLegend: true },
    Puddles: { label: 'Puddles', stroke: '#F7C385', nestedLegend: true }
  },
  legendPositionRatio: 80
};

<SunburstChart
  data={data}
  width={500}
  colors={colors}
  config={config}
  height={500}
/>
```