
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

<MultiSelect
  options={state.data}
  values={state.selected}
  onValueChange={onValueChange}
>
</MultiSelect>
```

