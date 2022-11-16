import Vue from "vue";
import App from "./App.vue";
import ActionCableVue from 'actioncable-vue'
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins";
import VTooltip from 'v-tooltip'
// import './permission' // permission control

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(VueEllipseProgress);

Vue.use(VueFileAgent)
import VueFileAgent from 'vue-file-agent'

Vue.component('apexchart', VueApexCharts)

Vue.use(VTooltip)

import { ValidationProvider, ValidationObserver } from 'vee-validate';

// Register it globally
// main.js or any entry file.
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


Vue.config.productionTip = false;

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  // connectionUrl: 'wss://escreens.really.sg/cable', // or function which returns a string with your JWT appended to your server URL as a query parameter
  connectionUrl: 'ws://localhost:8080/cable', // or
  connectImmediately: true
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
