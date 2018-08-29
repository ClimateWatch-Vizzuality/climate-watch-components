```js
const data = require('./data.js').data;
const config = require('./data.js').config;
const domain = require('./data.js').domain;

<SimpleBarChart
    config={config}
    data={data}
    domain={domain}
    height={500}
    barDataKey="y"
/>
```