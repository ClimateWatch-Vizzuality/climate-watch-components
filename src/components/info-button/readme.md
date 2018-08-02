### InfoButton example:

```js
const theme = require('./info-button-theme.scss');
const onClick = () => { console.info('hello button') };
<InfoButton
    infoOpen={false}
    handleInfoClick={onClick}
    square
/>
```