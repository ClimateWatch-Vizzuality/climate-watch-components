```js
const image = require('./assets/he.png');
const pagingTitles = ['Climate goals', 'National context', 'Annual emissions'];
const width = 400;
const height = 400;
const  data = [
    {id:1, value: 1000, unit: 'MtCO2', color: '#28965A'},
    {id:2, value: 5700, unit: 'MtCO2', color: '#28965A'},
    {id:3, value: 89, unit: 'MtCO2', color: '#28965A'},
    {id:4, value: 54, unit: 'MtCO2', color: '#28965A'},
    {id:5, value: 330, unit: 'MtCO2', color: '#28965A'},
    {id:6, value: 9, unit: 'MtCO2', color: '#28965A'},
    {id:7, value: 320, unit: 'MtCO2', color: '#28965A'},
    {id:8, value: 76, unit: 'MtCO2', color: '#28965A'}
  ];

const CustomTopSlide = ({title}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <h3 style={{fontSize: '44px', fontWeight: '300', textAlign: 'center' }}>{title}</h3>
    <p>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
    </p>
    <Button onClick={() => console.info(`Clicked on ${title}`)} >
      Go to GHG target
    </Button>
  </div>
);
const CustomBottomSlide = ({empty, withChart}) => !empty && (
  <div style={{display: 'flex', flexDirection: 'column', margin: '0 auto', maxWidth: '80%', alignItems: 'center'}}>
    {
      !withChart &&
      <img src={image} style={{maxWidth: '100%'}}/>
    }
    {
      withChart &&
      <BubbleChart
        width={width}
        height={height}
        data={data}
        handleNodeClick={(e, id) => console.info(`Clicked on element with id: ${id}`)}
      />
    }
  </div>
);

<Carousel pagingTitles={pagingTitles} >
  <CustomTopSlide title="GHG emissions" topSlide/>
  <CustomTopSlide title="Provinces" topSlide/>
  <CustomTopSlide title="Country" topSlide/>
  <CustomBottomSlide bottomSlide/>
  <CustomBottomSlide bottomSlide withChart/>
  <CustomBottomSlide bottomSlide empty/>
</Carousel>
```
