import Vue from "vue";
import { AppLayout } from "../util/contants";

import Default from "../layouts/Default.vue";
Vue.component(AppLayout.Default, Default);

import Home from "../layouts/Home/Home.vue";
Vue.component(AppLayout.Home, Home);

import HomeLite from "../layouts/Home/HomeLite.vue";
Vue.component(AppLayout.HomeLite, HomeLite);
