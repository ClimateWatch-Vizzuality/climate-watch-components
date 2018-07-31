### Icon example:

```js
const theme = require('./icon-theme.scss');
const icon = require('../../assets/contact.svg');
const handleOnClick = () => {
  console.log('something');
}
<Icon icon={icon} theme={theme} onClick={handleOnClick}/>
```