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
    { source: 0, target: 2, value: 24 },
    { source: 1, target: 3, value: 15 },
    { source: 1, target: 3, value: 19 },
    { source: 0, target: 3, value: 57 }
  ]
};

initialState = {
  ...data,
  loading: false
};

<SankeyChart data={data} tooltipChildren={node => <div>Tooltip Extra Info: {node.name}</div>} />
```
