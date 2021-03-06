```js
initialState = {
  selected: [],
  data:[
    { label: 'Fruits', value: 'Fruits' , groupParent: 'Fruits'},
    { label: 'Apple', value: 'Apple' , group: 'Fruits'},
    { label: 'Mango', value: 'Mango' , group: 'Fruits'},
    { label: 'Banana', value: 'Banana ', group: 'Fruits'},
    { label: 'Vegetables', value: 'Vegetables', groupParent: 'Vegetables'},
    { label: 'Pepper', value: 'Pepper', group: 'Vegetables'},
    { label: 'Sweets', value: 'Empty', groupParent: 'Sweets'}
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

Multiselect clearable and searchable version

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
    label="Multiple food selector"
    options={state.data}
    values={state.selected}
    onChange={onValueChange}
    placeholder={'Select a fruit'}
    clearable
    searchable
    multiselect
  >
  </MultiLevelDropdown>
</div>
```

Multiselect with option groups

```js
initialState = {
  selected: [],
  data:[
    { label: 'Fruits', value: 'Fruits' , groupParent: 'Fruits', optGroup: 'yummy'},
    { label: 'Apple', value: 'Apple' , group: 'Fruits'},
    { label: 'Mango', value: 'Mango' , group: 'Fruits'},
    { label: 'Banana', value: 'Banana ', group: 'Fruits'},
    { label: 'Vegetables', value: 'Vegetables', groupParent: 'Vegetables', optGroup: 'not_so_much'},
    { label: 'Pepper', value: 'Pepper', group: 'Vegetables'}
  ],
  optGroups: [{
    title: 'Yummy',
    groupId: 'yummy'
  }, {
    title: 'Not so much',
    groupId: 'not_so_much'
  }]
}
const onValueChange = (selected) => {
  setState({ selected })
}

<div style={{ width: '200px'}}>
  <MultiLevelDropdown
    label="Multiple food selector"
    options={state.data}
    optGroups={state.optGroups}
    values={state.selected}
    onChange={onValueChange}
    placeholder={'Select a fruit'}
    clearable
    searchable
    multiselect
  >
  </MultiLevelDropdown>
</div>
```
