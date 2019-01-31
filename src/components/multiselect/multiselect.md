
```js
initialState = {
  selected: [],
  data:[
    { label: 'All Selected', value: 'all-selected', total: true },
    { label: 'Apple', value: 'Apple' },
    { label: 'Mango', value: 'Mango' },
    { label: 'Banana', value: 'Banana '},
    { label: 'ReallyLongFruitNameWhichIDontRememberRighNow', value: 'Temporarily Unknown fruit'},
    { label: 'Vaccinium ovatum Evergreen Huckleberry', value: 'Evergreen Huckleberry'}
  ]
}
const onValueChange = (selected) => {
  setState({ selected })
}

<div style={{ width: '200px'}}>
  <Multiselect
    options={state.data}
    values={state.selected}
    onValueChange={onValueChange}
    placeholder={'Select a fruit'}
  >
</Multiselect>
</div>
```

