/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';

import {
  fromProjectRoot,
  getArgFromCLI,
  getArgsFromCLI,
  getDefaultArgs,
  getWebpackConfig,
  hasArgInCLI,
  hasProjectFile,
} from './index';

describe('fromProjectRoot', () => {
  test('returns the absolute path to a file from the project root', () => {
    const fileName = 'test.txt';
    const expectedPath = path.join(process.cwd(), fileName);
    expect(fromProjectRoot(fileName)).toBe(expectedPath);
  });
});

describe('hasProjectFile', () => {
  test('returns true if a file exists in the project root', () => {
    const fileName = 'package.json';
    expect(hasProjectFile(fileName)).toBe(true);
  });

  test('returns false if a file does not exist in the project root', () => {
    const fileName = 'nonexistent.js';
    expect(hasProjectFile(fileName)).toBe(false);
  });
});

describe('getArgsFromCLI', () => {
  test('returns an array of all arguments passed to the CLI', () => {
    const expectedArgs = ['--arg1', 'value1', '--arg2', 'value2'];
    process.argv = ['node', 'index.js', ...expectedArgs];
    expect(getArgsFromCLI()).toEqual(expectedArgs);
  });
});

describe('getArgFromCLI', () => {
  test('returns the value of an argument passed to the CLI', () => {
    const argName = '--arg1';
    const argValue = 'value1';
    process.argv = ['node', 'index.js', `${argName}=${argValue}`];
    expect(getArgFromCLI(argName)).toBe(argValue);
  });

  test('returns the name of an argument if it has no value', () => {
    const argName = '--arg1';
    process.argv = ['node', 'index.js', argName];
    expect(getArgFromCLI(argName)).toBe(argName);
  });

  test('returns undefined if the argument is not present in the CLI', () => {
    const argName = '--nonexistent';
    process.argv = ['node', 'index.js'];
    expect(getArgFromCLI(argName)).toBeUndefined();
  });
});

describe('hasArgInCLI', () => {
  test('returns true if an argument is present in the CLI', () => {
    const argName = '--arg1';
    process.argv = ['node', 'index.js', argName];
    expect(hasArgInCLI(argName)).toBe(true);
  });

  test('returns false if an argument is not present in the CLI', () => {
    const argName = '--nonexistent';
    process.argv = ['node', 'index.js'];
    expect(hasArgInCLI(argName)).toBe(false);
  });
});

describe('getWebpackConfig', () => {
  afterEach(() => {
    // reset process.argv to default value that is the webpack config path in the package.
    process.argv = ['node', 'index.js', `--config=${path.join(__dirname, '../config/webpack.config.js')}`];
  });

  test('returns the path to the webpack config file in the project root', () => {
    const rootWebpackConfigPath = path.join(process.cwd(), 'webpack.config.js');

    // create webpack config file in project root.
    try {
      fs.writeFileSync(rootWebpackConfigPath, '');
      // file written successfully
    } catch (err) {
      console.error(err);
    }

    expect(getWebpackConfig()).toBe(rootWebpackConfigPath);

    // remove webpack config file from project root.
    try {
      fs.unlinkSync(rootWebpackConfigPath);
      // file removed
    } catch (err) {
      console.error(err);
    }
  });

  test('returns the path to the webpack config file specified in the CLI', () => {
    const argName = '--config';
    const argValue = 'path/to/webpack.config.js';
    process.argv = ['node', 'index.js', `${argName}=${argValue}`];
    expect(getWebpackConfig()).toBe(argValue);
  });

  test('returns the default path to the webpack config file', () => {
    const expectedPath = path.join(__dirname, '../config/webpack.config.js');
    expect(getWebpackConfig()).toBe(expectedPath);
  });
});

describe('getDefaultArgs', () => {
  const defaultWebpackConfigPath = path.join(__dirname, '../config/webpack.config.js');

  it('should return an empty array if neither "build" nor "start" command is used', () => {
    process.argv = ['node', 'index.js'];
    expect(getDefaultArgs()).toEqual([]);
  });

  it('should include "--config" argument if "build" command is used', () => {
    process.argv = ['node', 'index.js', 'build'];
    expect(getDefaultArgs()).toContain(`--config=${defaultWebpackConfigPath}`);
  });

  it('should include "--config" argument with value from "--config" CLI argument if "build" command is used', () => {
    process.argv = ['node', 'index.js', 'build', '--config=my-webpack.config.js'];
    expect(getDefaultArgs()).toContain('--config=my-webpack.config.js');
  });

  it('should include "--webpack-copy-php" argument if "build" command is used and "--webpack-copy-php" CLI argument is not present', () => {
    process.argv = ['node', 'index.js', 'build'];
    expect(getDefaultArgs()).toContain('--webpack-copy-php');
  });

  it('should include "--webpack-src-dir" argument with value "blocks" if "build" command is used and "--webpack-src-dir" CLI argument is not present', () => {
    process.argv = ['node', 'index.js', 'build'];
    expect(getDefaultArgs()).toContain('--webpack-src-dir=blocks');
  });

  it('should include "--webpack-src-dir" argument with value from "--webpack-src-dir" CLI argument if "build" command is used and "--webpack-src-dir" CLI argument is present', () => {
    process.argv = ['node', 'index.js', 'build', '--webpack-src-dir=my-blocks'];
    expect(getDefaultArgs()).toContain('--webpack-src-dir=my-blocks');
  });

  it('should include "--config" argument if "start" command is used', () => {
    process.argv = ['node', 'index.js', 'start'];
    expect(getDefaultArgs()).toContain(`--config=${defaultWebpackConfigPath}`);
  });

  it('should include "--config" argument with value from "--config" CLI argument if "start" command is used', () => {
    process.argv = ['node', 'index.js', 'start', '--config=my-webpack.config.js'];
    expect(getDefaultArgs()).toContain('--config=my-webpack.config.js');
  });

  it('should include "--webpack-copy-php" argument if "start" command is used and "--webpack-copy-php" CLI argument is not present', () => {
    process.argv = ['node', 'index.js', 'start'];
    expect(getDefaultArgs()).toContain('--webpack-copy-php');
  });

  it('should include "--webpack-src-dir" argument with value "blocks" if "start" command is used and "--webpack-src-dir" CLI argument is not present', () => {
    process.argv = ['node', 'index.js', 'start'];
    expect(getDefaultArgs()).toContain('--webpack-src-dir=blocks');
  });

  it('should include "--webpack-src-dir" argument with value from "--webpack-src-dir" CLI argument if "start" command is used and "--webpack-src-dir" CLI argument is present', () => {
    process.argv = ['node', 'index.js', 'start', '--webpack-src-dir=my-blocks'];
    expect(getDefaultArgs()).toContain('--webpack-src-dir=my-blocks');
  });
});
