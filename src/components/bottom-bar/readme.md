### Bottom bar example:

```js
const theme = require('./bottom-bar-theme.scss');
const BrowserRouter = require('react-router-dom').BrowserRouter;
<BrowserRouter>
    <BottomBar 
        linkRoute='/' 
        linkTitle='About Page' 
        footerText='Powered by Vizzuality'
        theme={theme}
    />
</BrowserRouter>
```

