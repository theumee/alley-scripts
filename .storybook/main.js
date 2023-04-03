/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../packages/block-editor-tools/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
};
export default config;
