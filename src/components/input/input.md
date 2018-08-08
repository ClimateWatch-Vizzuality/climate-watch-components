
```js
<Input onChange={(value) => console.info(value)} placeholder='Feel free to write me'>
</Input>
```

Themed version without icon
```js
const theme = require('./input-theme.scss');
<Input
  theme={theme}
  onChange={(value) => console.info(value)}
  value='Using a theme is cool'
  icon={false} >
</Input>
```

