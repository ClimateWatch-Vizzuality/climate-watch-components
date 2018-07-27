const path = require('path');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');

const webpackConfig = require('./styleguide.webpack.js');
const { name, version } = require('./package.json');

module.exports = {
  title: `CW components | ${version}`,
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'
        }
      ]
    }
  },
  skipComponentsWithoutExample: true,
  getComponentPathLine: (componentPath) => {
    const dirname = path.dirname(componentPath, '.js');
    const componentName = camelCase(dirname.split('/').slice(-1)[0]);

    return `import ${upperFirst(componentName)} from '@bit/aabdaab.cw-components.global.${componentName}'`;
  },
  webpackConfig
};