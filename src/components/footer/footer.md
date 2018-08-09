```js
const logo = require('./assets/acts.png');
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
    includeContact={true}
    includePartners={true}
    contactOptions={{ contactTitle: 'Contact Us', contactMail: 'example@example.com' }}
    partners={partners}
/>
```