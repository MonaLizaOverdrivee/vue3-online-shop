import { createApp } from "vue";
import App from "./App.vue";
// import "./theme.css";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .mount("#app");
