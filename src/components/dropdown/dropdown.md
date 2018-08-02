
```js
const data = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Mango', value: 'Mango' },
  { label: 'Banana', value: 'Banana '}
]
initialState = {
  selected: data[0],
  data: data
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

Themed white version
```js
const data = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Mango', value: 'Mango' },
  { label: 'Banana', value: 'Banana '}
]
initialState = {
  selected: data[0],
  data: data
}
const onValueChange = (selected) => {
  setState({ selected })
}
const theme = require('./dropdown-themes.scss');
<div style={{ backgroundColor: 'lightblue' }}>
  <Dropdown
    theme={theme}
    value={state.selected}
    options={state.data}
    onValueChange={onValueChange}
    hasSearch={false}
  />
</div>
```


