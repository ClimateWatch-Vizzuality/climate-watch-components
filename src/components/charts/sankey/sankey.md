```js

const data = {
  nodes: [
    {
      name: 'Germany',
      color: '#00955f'
    },
    {
      name: 'France',
      color: '#FFB400'
    },
    {
      name: 'Loans',
      color: '#3498db'
    },
    {
      name: 'Grants',
      color: '#FF7800'
    }
  ],
  links: [
    { source: 0, target: 2, value: 240000 },
    { source: 0, target: 2, value: 940000 },
    { source: 1, target: 3, value: 150000 },
    { source: 1, target: 3, value: 190000 },
    { source: 0, target: 3, value: 5700000 }
  ]
};

initialState = {
  ...data,
  loading: false
};
const config = {
  tooltip:
    {
      scale: 1/100000,
      suffix: 'm'
    },
  node:
    {
      scale: 1/100000,
      suffix: 'm'
    }
};

<SankeyChart data={data} config={config} tooltipChildren={node => <div>Tooltip Extra Info: {node.name}</div>} />
```
