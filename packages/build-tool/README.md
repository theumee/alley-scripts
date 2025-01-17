# Alley Build Tool

The Alley Build Tool is an opinionated webpack build configuration that is an extension of the [WordPress Scripts](https://developer.wordpress.org/block-editor/packages/packages-scripts/) package. It is designed to be used for WordPress development with minimal configuration.

## Features

The primary features of the Alley Build Tool are:
* Minimal configuration.
* Separate source directories for blocks, slotfills, and entry points.
* Entry points are compiled into separate directories in the output.

## Installation

```
npm install @alleyinteractive/build-tool --save-dev
```

## Usage

This package offers a command-line interface and exposes a binary, `alley-build` so you can call it directly with npx – an npm package runner. However, this module is designed to be configured using the scripts section in the package.json file of your project.

The Alley Build Tool functions as a wrapper for `wp-scripts` and exposes all the possible commands that `wp-scripts` offers. The only difference is that the Alley Build Tool will run the `wp-scripts` command with the `--config` flag and point it to the Alley Build Tool's custom webpack configuration file when running the `build` and `start` commands.

_Example:_

```json
{
  "scripts": {
    "build": "alley-build build",
    "start": "alley-build start",
    "start:hot": "alley-build start --hot"
  }
}
```

Because `wp-scripts` is a dependency of `@alleyinteractive/build-tool`, you can also run `wp-scripts` commands such as [packages-update](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#packages-update) from the scripts configuration in your `package.json` file. Because `@alleyinteractive/build-tool` calls `wp-scripts` directly it can also run any `wp-scripts` command as a wrapper.

_Example:_

```json
{
  "scripts": {
    "packages-update": "alley-build packages-update --dist-tag=wp-6.3",
  }
}
```
or directly in the command line:
```sh
npx alley-build packages-update --dist-tag=wp-6.3
```
### Default options
By default the following command options are applied when running the `build` and `start` commands:
* `--webpack-copy-php` – enables copying all PHP files from the blocks directory and its subdirectories to the output directory.
* `--webpack-src-dir` – Allows customization of the blocks source code directory. Default is `blocks`.

### `Additional CLI options`

* `--webpack-entries-dir` `<string>` - The directory where wp-scripts will detect entry point directories that are not blocks. These entries can be slotfills or webpack entry points (Default: `entries`)
* `--webpack-blocks-only` - This option will disable the entries directory and only compile blocks set in the `blocks` directory. This is useful for projects that do not use slotfills or separate entry points.


### Extending the config

Extending the Alley Build Tool webpack configuration is possible and uses the same approach as [extending the webpack config in wp-scripts](https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/README.md#extending-the-webpack-config).

There are several ways to extend the webpack configuration. One uses the common JS `require` syntax and the other uses the ESM `import` syntax. The following examples use the common JS `require` syntax.
* Provide a `webpack.config.js` file in the root of your project.
* `require` the webpack config from `@alleyinteractive/build-tool` in the `webpack.config.js` file in your project.
* Use the spread operator to import all of or part of the provided configuration.

```js
const path = require('path');
const defaultConfig = require('@alleyinteractive/build-tool/dist/cjs/config/webpack.config');

module.exports = {
  ...defaultConfig,

  resolve: {
    ...defaultConfig.resolve,
    alias: {
      ...defaultConfig.resolve?.alias,
      // Custom alias to resolve paths to the project root. Example: 'root/client/index.js'.
      root: path.resolve(__dirname),
    },
  },
};
```

**NOTE**: To use ESM import syntax use the following import path:
```js
import defaultConfig from '@alleyinteractive/build-tool/dist/esm/config/webpack.config';
```
### From Source

To work on this repository:

```sh
git clone git@github.com:alleyinteractive/alley-scripts.git
cd packages/build-tool
npm install
npm link
```

In order to test the build-tool with another project, you will need to point to this package, e.g.:

```json
{
  "scripts": {
    "build": "alley-build build",
    "start": "alley-build start"
  },
  "devDependences": {
    "@alleyinteractive/build-tool": "file:../path/to/alley-scripts/packages/build-tool/index.js"
  }
}
```

Then run `npm link ../path/to/alley-scripts/packages/build-tool` and npm will symlink to this folder, and you can work on your changes.

### Changelog

This project keeps a [changelog](CHANGELOG.md).


## Development Process

See instructions above on installing from source. Pull requests are welcome from the community and will be considered for inclusion. Releases follow semantic versioning and are shipped on an as-needed basis.


### Contributing

See [our contributor guidelines](../../CONTRIBUTING.md) for instructions on how to
contribute to this open source project.

## Related Efforts
- [WordPress Scripts](https://www.npmjs.com/package/@wordpress/scripts)

## Maintainers

- [Alley](https://github.com/alleyinteractive)

![Alley logo](https://avatars.githubusercontent.com/u/1733454?s=200&v=4)


### Contributors

Thanks to all of the [contributors](../../CONTRIBUTORS.md) to this project.

## License

This project is licensed under the
[GNU Public License (GPL) version 2](LICENSE) or later.