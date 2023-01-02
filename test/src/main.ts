import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { useVuelidate } from "@vuelidate/core";
import router from "./router";
import pinia from "./store/store";
import "./index.css";

createApp(App).use(pinia).use(router).use(useVuelidate).mount("#app");
