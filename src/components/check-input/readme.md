
```js
const styles = require('./check-input-theme.scss');
<CheckInput
  className={styles.checkbox}
  onChange={(value) => console.info(value)}
  label={'Subscribe'}
  toggleFirst
  theme={styles}
  disabled={false}
/>
```
