### Button example:

```js
const theme = require('./button-theme.scss');
const Link = require('react-router-dom').Link;
const onClick = () => { console.info('hello button') };
<Button 
    theme={theme} 
    onClick={onClick}
>
    Submit Button
</Button>
```