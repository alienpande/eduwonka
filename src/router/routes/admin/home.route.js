import { AppLayout } from "../../../util/contants";
import { Routes } from "../../../util/menus/dash.menus";
export default {
  path: '/',
  name: 'HomeDashboard',
  meta: { layout: AppLayout.Home },
  component: () =>
    import(/* webpackChunkName: "finance" */ "../../../views/admin/dashboard/Home.vue"),
  children: [
    {
      path: Routes.HOME,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "../../../views/admin/dashboard/dashboard.vue"
        ),
      name: "Dashboard",
    },
  ],
};
