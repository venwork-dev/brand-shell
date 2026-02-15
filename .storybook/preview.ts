import type { Preview } from "@storybook/react";

import "../styles/default.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // fail tests when accessibility violations are detected
      test: "error",
    },
  },
};

export default preview;
