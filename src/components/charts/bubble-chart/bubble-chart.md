```js

const styles = require('./bubble-chart-styles.scss');
const width = 400;
const height = 400;
const data = [
    {id:1, value: 10000, unit: 'MtCO2', tooltipContent: ['First line', 10000, 'Third line'], color: '#28965A'},
    {id:2, value: 57000, unit: 'MtCO2', tooltipContent: [], color: '#28965A'},
    {id:3, value: 890, unit: 'MtCO2', color: '#28965A'},
    {id:4, value: 540, unit: 'MtCO2', color: '#28965A'},
    {id:5, value: 3300, unit: 'MtCO2', color: '#28965A'},
    {id:6, value: 90, unit: 'MtCO2', color: '#28965A'},
    {id:7, value: 3200, unit: 'MtCO2', color: '#28965A'},
    {id:8, value: 760, unit: 'MtCO2', color: '#28965A'}
  ];

const config = {
  scale: 1/1000,
  suffix: 'k',
  format: '~r'
};

<BubbleChart
  styles={styles}
  width={width}
  height={height}
  data={data}
  handleNodeClick={(e, id) => console.info(`Clicked on element with id: ${id}`)}
  config={config}
/>
```
