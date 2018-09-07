```js

const styles = require('./bubble-chart-styles.scss');
const width = 400;
const height = 400;
const  data = [
    {id:1, value: 1000, unit: 'MtCO2', color: '#28965A'},
    {id:2, value: 5700, unit: 'MtCO2', color: '#28965A'},
    {id:3, value: 89, unit: 'MtCO2', color: '#28965A'},
    {id:4, value: 54, unit: 'MtCO2', color: '#28965A'},
    {id:5, value: 330, unit: 'MtCO2', color: '#28965A'},
    {id:6, value: 9, unit: 'MtCO2', color: '#28965A'},
    {id:7, value: 320, unit: 'MtCO2', color: '#28965A'},
    {id:8, value: 76, unit: 'MtCO2', color: '#28965A'}
  ];

<BubbleChart
  styles={styles}
  width={width}
  height={height}
  data={data}
  handleNodeClick={(e, id) => console.info(`Clicked on element with id: ${id}`)}
/>
```
