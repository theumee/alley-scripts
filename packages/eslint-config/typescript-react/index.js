/**
 * Typescript configuration using AirBnBs ESLint config and Airbnb Typescript.
 */
const packageConfigs = [
  '../configs/react',
  '../parsers/typescript',
].map(require.resolve);

module.exports = {
  extends: [
    ...packageConfigs,
    'airbnb-typescript',
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/require-default-props': 'off',
  },
};