```js
const logo = require('./assets/acts.png');
const theme = require('./footer-theme.scss');
const partners = [
    {
        link: 'example-link',
        img: {
            src: logo,
            alt: 'Example logo'
        }
    }
];
<Footer
    includeBottom={true}
    includePartners={true}
    partners={partners}
    theme={theme}
    footerText='Powered by Vizzuality'
    partnersTitle='Support received from:'
    disclaimerText='Copyright by Vizzuality'
    children={<div>Some texto here</div>}
/>
```