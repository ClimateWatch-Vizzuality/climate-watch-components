
```js
const styles = require('./check-input-theme.scss');
initialState = {
  checked: true
};
<CheckInput
  className={styles.checkbox}
  onChange={(value) => setState(state => ({checked: !state.checked}))}
  label={'Subscribe'}
  toggleFirst
  checked={state.checked}
  theme={styles}
  disabled={false}
/>
```
