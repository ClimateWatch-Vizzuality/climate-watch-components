
```js
const styles = require('./map-component-styles.scss');
const ZOOM_STEP = 2;

initialState = {
  zoom: 1
};

const handleZoomIn = () => {
  setState((state) => {
    const zoom = state.zoom * ZOOM_STEP;
    return { zoom }
  });
};

const handleZoomOut = () => {
  setState((state) => {
    const zoom = state.zoom / ZOOM_STEP;
    return { zoom }
  });
};

const onCountryClick = () => console.log('country clicked');

<div className={styles.wrapper}>
  <MapComponent
    zoom={state.zoom}
    handleZoomIn={handleZoomIn}
    handleZoomOut={handleZoomOut}
    zoomEnable
    className={styles.map}
    onCountryClick={onCountryClick} 
  />
</div>
```

Indonesia
```js
const styles = require('./map-component-styles.scss');

initialState = {
  zoom: 5
};

const ZOOM_STEP = 2;

const handleZoomIn = () => {
  setState((state) => {
    const zoom = state.zoom * ZOOM_STEP;
    return { zoom }
  });
};

const handleZoomOut = () => {
  setState((state) => {
    const zoom = state.zoom / ZOOM_STEP;
    return { zoom }
  });
};

const onCountryClick = () => console.log('country clicked');
<div className={styles.wrapper}>
  <MapComponent
    zoom={state.zoom}
    customCenter={[120,0]}
    zoomEnable
    handleZoomIn={handleZoomIn}
    handleZoomOut={handleZoomOut}
    className={styles.map}
    onCountryClick={onCountryClick} 
  />
</div>
```