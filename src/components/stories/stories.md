```js
const planetImage = require('./assets/pretty_planet.jpg');
const secondPlanetImage = require('./assets/prep-planet.jpeg');
const handleStoryClick = (storyTitle) => { console.info(storyTitle); }
const stories = [
    {
        link: 'some-link',
        title: 'This is a great story'
    },
    {
        link: 'some-other-link',
        title: 'Go to this story',
        background_image_url: planetImage
    },
    {
        link: 'link',
        title: 'And to this story',
        background_image_url: secondPlanetImage
    }
];
<Stories
    stories={stories} storiesTitle="Highlighted Stories" handleClick={handleStoryClick}
/>
```
