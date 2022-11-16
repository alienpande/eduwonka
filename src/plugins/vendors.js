import Vue from "vue";

//#region Element io
import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "../assets/css/style.css";
Vue.use(Element, { locale: locale });
//#endregion

//#region Page transition
import VuePageTransition from "vue-page-transition";
Vue.use(VuePageTransition);
//#endregion

//#region Charting Library
import VueGoogleCharts from "vue-google-charts";
Vue.use(VueGoogleCharts);
//#endregion

//#region VueViewPort
import VueViewports from "vue-viewports";
const options = [
  {
    rule: "320px",
    label: "s", // mobile
  },
  {
    rule: "768px",
    label: "m", // tablet
  },
  {
    rule: "1024px",
    label: "l", // desktop
  },
  {
    rule: "1920px",
    label: "xl", // hd-desktop
  },
  {
    rule: "2560px",
    label: "xxl", // qhd-desktop
  },
  {
    rule: "3840px",
    label: "uhd-desktop",
  },
];
Vue.use(VueViewports, options);
Vue.prototype.$view = Vue.prototype.$currentViewport
  ? Vue.prototype.$currentViewport.label
  : "s";
//#endregion
