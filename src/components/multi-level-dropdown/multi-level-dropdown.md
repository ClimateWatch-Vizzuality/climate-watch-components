

```js
initialState = {
  selected: [],
  data:[
    { label: 'Fruits', value: 'Fruits' , groupParent: 'Fruits'},
    { label: 'Apple', value: 'Apple' , group: 'Fruits'},
    { label: 'Mango', value: 'Mango' , group: 'Fruits'},
    { label: 'Banana', value: 'Banana ', group: 'Fruits'},
    { label: 'Vegetables', value: 'Vegetables', groupParent: 'Vegetables'},
    { label: 'Pepper', value: 'Pepper', group: 'Vegetables'}
  ]
}
const onValueChange = (selected) => {
  setState({ selected })
}

<div style={{ width: '200px'}}>
  <MultiLevelDropdown
    label="Food selector"
    options={state.data}
    values={state.selected}
    onChange={onValueChange}
    placeholder={'Select a fruit'}
  >
  </MultiLevelDropdown>
</div>
```

Multiselect version

```js
initialState = {
  selected: [],
  data:[
    { label: 'Fruits', value: 'Fruits' , groupParent: 'Fruits'},
    { label: 'Apple', value: 'Apple' , group: 'Fruits'},
    { label: 'Mango', value: 'Mango' , group: 'Fruits'},
    { label: 'Banana', value: 'Banana ', group: 'Fruits'},
    { label: 'Vegetables', value: 'Vegetables', groupParent: 'Vegetables'},
    { label: 'Pepper', value: 'Pepper', group: 'Vegetables'}
  ]
}
const onValueChange = (selected) => {
  console.log('selected', selected)
  setState({ selected })
}

<div style={{ width: '200px'}}>
  <MultiLevelDropdown
    label="Multiple food selector"
    options={state.data}
    values={state.selected}
    onChange={onValueChange}
    placeholder={'Select a fruit'}
    multiselect
  >
  </MultiLevelDropdown>
</div>
```

