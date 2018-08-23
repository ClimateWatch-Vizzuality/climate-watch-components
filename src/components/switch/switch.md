Version with initially selected international tab
```js
const options = [
    { name: 'international', value: 'international' },
    { name: 'domestic', value: 'domestic' },
    { name: 'non-monetized', value: 'non-monetized', disabled: true }
];
const onClick = (selectedOption) => { console.info('Selected option: ', selectedOption); };
<Switch options={options} onClick={onClick} selectedOption='international' />
```

Themed version
```js
const theme = require('./switch-theme.scss');
const options = [
    { name: 'poland', value: 'poland' },
    { name: 'portugal', value: 'portugal' },
    { name: 'spain', value: 'spain' }
];
const onClick = (selectedOption) => { console.info('Selected option: ', selectedOption); };
<Switch options={options} onClick={onClick} theme={theme}/>
```