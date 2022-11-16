// import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/public.menus";

export default [
  {
    path: Routes.SIGNIN,
    name: "SignIn",
    // meta: { layout: AppLayout.Home },
    component: () =>
      import(/* webpackChunkName: "library" */ "@/views/parent/login/index.vue"),
  },
  {
    path: Routes.SIGNUP,
    name: "SignUp",
    // meta: { layout: AppLayout.Home },
    component: () =>
      import(/* webpackChunkName: "library" */ "@/views/parent/login/signup/index.vue"),
  },
];
