```js
initialState = {
  selected: [],
  data:[
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

Multiselect with sections/option groups

```js
initialState = {
  selected: [],
  data:[
    { label: 'Apple', value: 'Apple', groupId: 'fruits' },
    { label: 'Mango', value: 'Mango', groupdId: 'fruits' },
    { label: 'Banana', value: 'Banana', groupId: 'fruits' },
    { label: 'ReallyLongFruitNameWhichIDontRememberRighNow', value: 'Temporarily Unknown fruit', groupId: 'others'},
    { label: 'Vaccinium ovatum Evergreen Huckleberry', value: 'Evergreen Huckleberry', groupId: 'others'}
  ],
  groups: [{
    groupId: 'fruits',
    title: 'Fruits'
  }, {
    groupId: 'others',
    title: 'Others'
  }]
}
const onValueChange = (selected) => {
  setState({ selected })
}

<div style={{ width: '200px'}}>
  <Multiselect
    options={state.data}
    groups={state.groups}
    values={state.selected}
    onValueChange={onValueChange}
    placeholder={'Select a fruit'}
  >
</Multiselect>
</div>
```
