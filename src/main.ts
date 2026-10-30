import { createApp } from "vue";
import App from "@/App.vue";

import "@/styles/general.css";
import "@/styles/reset.css";
import "@/styles/variables.css";

const app = createApp(App);
app.mount("#app");