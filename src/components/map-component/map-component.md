
```js
const styles = require('./map-component-styles.scss');
const onCountryClick = () => console.log('country clicked');
<div className={styles.wrapper}>
  <MapComponent zoomEnable className={styles.map} onCountryClick={onCountryClick} />
</div>
```
