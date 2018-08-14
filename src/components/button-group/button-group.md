```js
const iconDownload = require('./assets/download.svg').default;
const iconInfo = require('./assets/info.svg').default;

<ButtonGroup>
  <Button onClick={() => console.info('Clicked on download')}>
    <Icon icon={iconDownload}></Icon>
  </Button>
  <Button onClick={() => console.info('Clicked on info')}>
    <Icon icon={iconInfo}></Icon>
  </Button>
</ButtonGroup>
```
