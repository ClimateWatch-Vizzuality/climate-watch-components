
```js
const handleOnClick = () => {
  console.info('something');
}
<Icon onClick={handleOnClick}/>
```

Themed version
```js
const theme = require('./icon-theme.scss');
const handleOnClick = () => {
  console.info('something');
}
<Icon theme={theme} onClick={handleOnClick}/>
```
