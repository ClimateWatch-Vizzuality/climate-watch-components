```js
const locationsValues = 5;
const handleRemove = () => { console.info('Remove sth'); };
<Tag
    key='PL'
    label='Poland'
    data={{
        id: 'PL',
        value: 'Poland'
    }}
    canRemove={locationsValues.length > 1}
    onRemove={handleRemove}
/>
```