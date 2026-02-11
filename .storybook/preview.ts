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
      // keep violations visible in the addon panel, but don't fail CI yet
      test: "todo",
    },
  },
};

export default preview;