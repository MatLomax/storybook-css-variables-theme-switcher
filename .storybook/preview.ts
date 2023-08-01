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
        "Red": "button{background-color: #FF0000 !important; color: #fff;}",
        "Green": "button{background-color: #00FF00 !important; color: #fff;}",
      },
      defaultTheme: "Red", 
    }
  },
};

export default preview;
