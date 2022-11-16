import { AppLayout } from "../../../util/contants";
import { Routes } from "../../../util/menus/dash.menus";
export default {
  path: '/home',
  name: "finance",
  meta: { layout: AppLayout.Home },
  component: () =>
    import(/* webpackChunkName: "finance" */ "../../../views/teacher/dashboard/Home.vue"),
  children: [
    {
      path: Routes.HOME,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "../../../views/teacher/dashboard/dashboard.vue"
        ),
      name: "Dashboard",
    },
  ],
};
