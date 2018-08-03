```js
const locationsValues = 5;
const handleRemove = () => { console.info('Remove this tag'); };
<Tag
    key='PL'
    label='Poland'
    data={{
        id: 'PL',
        value: 'Poland'
    }}
    canRemove={locationsValues.length > 1}
    color='orange'
    onRemove={handleRemove}
    canRemove={true}
/>
```