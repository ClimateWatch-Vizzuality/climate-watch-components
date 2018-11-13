
```js
const styles = require('./map-component-styles.scss');
const onCountryClick = () => console.log('country clicked');
<div className={styles.wrapper}>
  <MapComponent zoomEnable className={styles.map} onCountryClick={onCountryClick} />
</div>
```

Indonesia
```js
const styles = require('./map-component-styles.scss');
const onCountryClick = () => console.log('country clicked');
<div className={styles.wrapper}>
  <MapComponent zoom={5} customCenter={[120,0]}zoomEnable className={styles.map} onCountryClick={onCountryClick} />
</div>
```