Legend for the map
```js
const buckets = [
  '#fffffb',
  '#ffffd5',
  '#f4f6c8',
  '#a6d8b3',
  '#6cc1a7',
  '#439c9a',
  '#2b6c85',
  '#1b4a75',
  '#163449'
];
const data = { legend: { left: '0-10 Mt CO2e', right: '> 1000 Mt CO2e' }, buckets: buckets };
<MapFooter
  data={data}
/>
```