# Climate watch components playground

[Styleguidist](https://github.com/styleguidist/react-styleguidist) playground to see the reusable components for the climate watch platform applications.

## How to use it

```
yarn add github:ClimateWatch-Vizzuality/climate-watch-components#versionNumber
```

```
import { NoContent, Loading, Table } from 'cw-components';
```

and will be ready to use them!


## Release

We are using the [release](https://github.com/zeit/release) package to run automatically this process

To make it easier with our workflow it is using a custom fork where it only takes all of the PR commits to generate the changelog instead of them al


## How to

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
