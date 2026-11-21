import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "@alexander499/ui",
  description: "A Vue UI Library",
  themeConfig: {
    nav: [
      { text: "Docs", link: "/introduction/what-is-alexander499-ui" }
    ],
    sidebar: [
      { text: "Introduction", items: [
        { text: "What is @alexander499/ui?", link: "/introduction/what-is-alexander499-ui" },
        { text: "Getting Started", link: "/introduction/getting-started" }
      ]},
      { text: "Components", items: [
        { text: "General", items: [
          { text: "Button", link: "/components/general/button" },
          { text: "Slider", link: "/components/general/slider" },
          { text: "Toggle", link: "/components/general/toggle" },
          { text: "Checkbox", link: "/components/general/checkbox" },
          { text: "Segmented Control", link: "/components/general/segmented-control" },
          { text: "Stepper", link: "/components/general/stepper" },
          { text: "Page Control", link: "/components/general/page-control" },
          { text: "Icon", link: "/components/general/icon" }
        ]},
        { text: "Fields", items: [
          { text: "Text Field", link: "/components/fields/text-field" },
          { text: "Number Field", link: "/components/fields/number-field" },
          { text: "Search Field", link: "/components/fields/search-field" }
        ]},
        { text: "Floating", items: [
          { text: "Dialog", link: "/components/floating/dialog" },
          { text: "Popover", link: "/components/floating/popover" },
          { text: "Menu", link: "/components/floating/menu" },
          { text: "Notification", link: "/components/floating/notification" },
          { text: "NotificationGroup", link: "/components/floating/notification-group" }
        ]}
      ]}
    ],
    outline: {
      level: [2, 3]
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/alexander-499/alexander499-ui" }
    ]
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^@alexander499\/ui$/,
          replacement: fileURLToPath(new URL("../../../packages/ui/src/index.ts", import.meta.url))
        },
        {
          find: /^@\//,
          replacement: fileURLToPath(new URL("../../../packages/ui/src/", import.meta.url))
        }
      ],
      dedupe: ["vue"]
    }
  }
});