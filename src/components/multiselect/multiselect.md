
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

<Multiselect
  options={state.data}
  values={state.selected}
  onValueChange={onValueChange}
>
</Multiselect>
```

