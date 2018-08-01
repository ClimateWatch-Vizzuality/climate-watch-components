
```js
initialState = {
  selected: [],
  data:[
    { label: 'Apple', value: 'Apple' },
    { label: 'Mango', value: 'Mango' },
    { label: 'Banana', value: 'Banana '}
  ]
}
const onValueChange = (selected) => {
  setState({ selected })
}

<Dropdown
  value={state.selected}
  options={state.data}
  onValueChange={onValueChange}
  hasSearch={false}
/>
```


