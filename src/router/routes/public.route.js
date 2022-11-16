import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/public.menus";
export default [
  {
    path: Routes.SIGNIN,
    name: "PublicRoutes",
    meta: { layout: AppLayout.Default },
    component: () =>
      import(/* webpackChunkName: "library" */ "@/views/public/SignIn.vue"),
  },
  {
    path: Routes.SIGNUP,
    name: "PublicRoutes",
    meta: { layout: AppLayout.Default },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/public/SignUp.vue"
      ),
  }
];
