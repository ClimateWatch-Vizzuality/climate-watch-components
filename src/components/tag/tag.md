```js
const theme = require('./tag-theme.scss');
const ReactTooltip = require('react-tooltip');
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
        tooltipId='tooltip-id'
        canRemove
        color='orange'
        onRemove={handleRemove}
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
        tooltipId='tooltip-id'
        canRemove={false}
        color='red'
        onRemove={handleRemove}
    />
    <ReactTooltip id='tooltip-id' />
</div>
```

Tag with icon passed
```js
const theme = require('./tag-theme.scss');
const ReactTooltip = require('react-tooltip');
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
        tooltipId='tooltip-id'
        canRemove
        color='orange'
        onRemove={handleRemove}
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
        tooltipId='tooltip-id'
        canRemove={false}
        onRemove={handleRemove}
    />
    <ReactTooltip id='tooltip-id' />
</div>
```