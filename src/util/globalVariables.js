import Vue from "vue";

//#region Routing URL [this.$url]
import { Routes as DigitalLibraryRoutes } from "./menus/digital-library.menus";
import { Routes as FinanceRoutes } from "./menus/finance.menus";
import { Routes as HQRoutes } from "./menus/hq.menus";
import { Routes as LearnRoutes } from "./menus/learn.menus";
import { Routes as LibraryRoutes } from "./menus/library.menus";
import { MAIN as MainRoutes } from "./menus/main.menus";
import { Routes as SchoolRoutes } from "./menus/school.menus";
import { Routes as PublicRoutes } from "./menus/public.menus";
import { Routes as OnboardingRoutes } from "./menus/onboarding.menus";

Vue.prototype.$url = {
  ...DigitalLibraryRoutes,
  ...FinanceRoutes,
  ...HQRoutes,
  ...LearnRoutes,
  ...LibraryRoutes,
  ...MainRoutes,
  ...SchoolRoutes,
  ...PublicRoutes,
  ...OnboardingRoutes,
};
//#endregion

//#region Event Bus [this.$event]
import { event } from "./eventsEmitter";
Vue.prototype.$event = event;
//#endregion

//#region VuePort [this.$size]-> xs, sm, m, l, xl, xxl
const size = {
  xs: "xs",
  s: "s",
  m: "m",
  l: "l",
  xl: "xl",
  xxl: "xxl",
};
Vue.prototype.$size = size;
//#endregion
