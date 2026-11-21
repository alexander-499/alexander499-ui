import VitePressTheme from "vitepress/theme";
import "./custom.css";
import Demo from "./components/Demo.vue";

export default {
  extends: VitePressTheme,
  enhanceApp({ app }) {
    app.component("Demo", Demo);
  }
};