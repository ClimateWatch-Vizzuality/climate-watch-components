# Climate watch components playground

[Styleguidist](https://github.com/styleguidist/react-styleguidist) playground to see the reusable components for the climate watch platform applications.

## How to use it

```
yarn add github:ClimateWatch-Vizzuality/climate-watch-components#versionNumber
```

After adding the version number, go to your's project frontend entry file (most probably `app/javascript/app.jsx`) and import the css:
```
import 'cw-components/dist/main.css';
```

```
import { NoContent, Loading, Table } from 'cw-components';
```

and will be ready to use them!

## How to develop

Install using yarn install. Package-lock.json won't be created as we want to avoid conflicts

## How to link component locally

1. Register cw-components as linked package. Run `yarn link`. Have to be done just once.
2. Run `yarn dev` to run webpack with development config.
3. On app repo. `yarn link cw-components`.
4. It's a good practice to unlink the package after testing to not forget about it later.

To remove this local linked package from the application. Run following on the app repo:

1. Unlink package `yarn unlink cw-components`.
2. Remove node modules `rm -rf node_modules`.
3. Reinstall packages `yarn` to bring back previous version of cw-components.


Make sure that React, react-dom or maybe other libraries are not loaded twice when linking this package locally.

In the app webpack configuration, resolve packages to always use app's node_modules version and do not resolve symlinks, because
[webpack has some problems with that](https://github.com/webpack/webpack/issues/1643).

```
  resolve: {
    symlinks: false,
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  }
```

You can also add [duplication checker plugin](https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin) to know about other duplicated libraries.

## How to release

We are using the [release](https://github.com/zeit/release) package to run automatically this process

To make it easier with our workflow it is using a custom fork where it only takes all of the PR commits to generate the changelog instead of them al


So to make a new release follow the next steps:
1. Make sure you want to put in production everything that it is in master.
2. Merge all the approved PRs to master
3. Checkout to ```build``` branch and merge ```master``` into build.
4. Run ```yarn compile``` to compile js and css.
5. Run the command ```npx release major|minor|patch```. Remember this has to be run on ```build``` branch after yarn compile.
6. You will be prompted with a list of commits where you select what time of change it includes. Normally `feature/*` branches go to `minor` and `fix/*` to `patches`
7. When finished you will have:
    - The new version number.
    - The package.json version updated.
    - A new tag committed
    - Changelog ready to publish.
