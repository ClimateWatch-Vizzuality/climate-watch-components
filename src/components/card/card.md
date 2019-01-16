
```js
const styles = require('./card-styles.scss');
<Card title='Card' theme={styles} subtitle='sub title'>
    <div className={styles.cardContent}>
        Have an IMPACT!
    </div>
</Card>
```

Example with first rendering the title on the Card and then the children.
Possible when passing *reverse* flag set to true.
```js
const styles = require('./card-styles.scss');
<Card title='Card' reverse theme={styles} subtitle='sub title'>
    <div className={styles.cardContent}>
        Have an IMPACT!
    </div>
</Card>
```