
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
  />
</div>
```

Icons options version
```js
const theme = require('./dropdown-themes.scss');
const areaIcon = require('./assets/icon_area_chart.svg');
const arrowIcon = require('./assets/dropdown-arrow.svg');
const infoIcon = require('./assets/info.svg');
const data = [
  { label: 'line', value: 'line' },
  { label: 'area', value: 'area' },
  { label: 'buble', value: 'buble '}
]
const icons = {
'line': areaIcon,
'area': arrowIcon,
'buble': infoIcon
}

initialState = {
  selected: data[0],
  data: data
}
const onValueChange = (selected) => {
  setState({ selected })
}
<div>
  <Dropdown
    theme={{ wrapper: theme.iconDropdownWrapper}}
    value={icons[state.selected.value]}
    options={state.data}
    onValueChange={onValueChange}
    iconsDropdown
    icons={icons}
  />
</div>
```


