```js
const theme = require('./tag-theme.scss');
const locationsValues = 5;
const handleRemove = (target) => { console.info('Remove this tag', target); };
<div style={{ display: 'flex' }}>
    <Tag
        key='PL'
        theme={theme}
        label='Poland'
        data={{
            id: 'PL',
            title: 'Poland',
            value: 'Poland'
        }}
        tooltipId='poland-tooltip-id'
        canRemove={locationsValues.length > 1}
        color='orange'
        onRemove={handleRemove({target: 'any target'})}
    />
    <Tag
        key='PT'
        label='Portugal'
        theme={theme}
        data={{
            id: 'PT',
            title: 'Portugal',
            value: 'Portugal'
        }}
        tooltipId='portugal-tooltip-id'
        canRemove={locationsValues.length > 1}
        color='red'
        onRemove={handleRemove({target: 'any target'})}
    />
</div>
```