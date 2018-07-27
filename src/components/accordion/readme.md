### Accordion bit example:

```js
initialState = {
  openSlug: '',
  data:[
    { title: 'hey', slug: 'my-slug', content: 'my super content' },
    { title: 'hey2', slug: 'my-slug2', content: 'my super content2' }
  ]
}
const styles = require('./accordion-styles.scss');
const handleOnClick = (slug) => {
  setState((state) => {
    const openSlug = state.openSlug === slug ? 'none' : slug;
    return { openSlug }
  });
}

<Accordion
  theme={styles}
  loading={false}
  data={state.data}
  openSlug={state.openSlug}
  handleOnClick={handleOnClick}
>
  {state.data.map(section => <p>{section.content}</p>)}
</Accordion>
```

