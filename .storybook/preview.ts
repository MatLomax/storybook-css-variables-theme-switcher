import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    themes: {
      files: {
        "Red": "/.storybook/themes/red.css",
        "Green": "/.storybook/themes/green.css",
      },
      defaultTheme: "Red", 
    }
  },
};

export default preview;
