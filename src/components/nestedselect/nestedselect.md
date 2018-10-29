
```js
initialState = {
  selected: [],
  data:[
    { label: 'Fruits', value: 'Fruits' },
    { label: 'Vegetables', value: 'Vegetables' },
    { label: 'Apple', value: 'Apple', groupId: 'Fruits' },
    { label: 'Mango', value: 'Mango', groupId: 'Fruits' },
    { label: 'Banana', value: 'Banana', groupId: 'Fruits' },
    { label: 'Pepper', value: 'Pepper', groupId: 'Vegetables' }
  ]
}
const onValueChange = (selected) => {
  console.log(selected)
  setState({ selected })
}

<Nestedselect
  options={state.data}
  values={state.selected}
  onChange={onValueChange}
>
</Nestedselect>
```
