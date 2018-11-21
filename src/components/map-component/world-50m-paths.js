import { feature } from 'topojson-client';

import topojson from './world-50m-topo';

const paths = feature(
  topojson,
  topojson.objects[Object.keys(topojson.objects)[0]]
).features;

export default paths;
