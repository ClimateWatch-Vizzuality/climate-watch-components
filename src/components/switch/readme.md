```js
const options = [
    { name: 'international', value: 'international' },
    { name: 'domestic', value: 'domestic' },
    { name: 'non-monetized', value: 'non-monetized' }
];
const onClick = () => { console.info('clicked it'); };
<Switch options={options} onClick={onClick} />
```

Themed version
```js
const theme = require('./switch-theme.scss');
const options = [
    { name: 'international', value: 'international' },
    { name: 'domestic', value: 'domestic' },
    { name: 'non-monetized', value: 'non-monetized' }
];
const onClick = () => { console.info('clicked it'); };
<Switch options={options} onClick={onClick} theme={theme}/>
```