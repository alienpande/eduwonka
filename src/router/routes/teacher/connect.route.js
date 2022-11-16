import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/connect.menus";
export default {
  path: Routes.LN_BASE,
  name: "Connect",
  meta: { layout: AppLayout.Home, permission: "teacher" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/teacher/connect/index.vue"),
  children: [
    {
      path: Routes.CO_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/connect/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.CO_MESSENGER,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/connect/Messenger.vue"
        ),
      name: "Messenger",
    },
    {
      path: Routes.CO_PARENT_APPOINTMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/connect/appointment/parentAppointment.vue"
        ),
      name: "Messenger-parent-apointment",
    },
    {
      path: Routes.CO_STAFF_APOINTMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/connect/appointment/staffAppointment.vue"
        ),
      name: "Messenger-staff-apointment",
    },
    {
      path: Routes.CO_STAFF_APOINTMENTCREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/connect/appointment/createAppointment.vue"
        ),
      name: "Create-staff-apointment",
    },
    {
      path: Routes.CO_PERMISSION_SLIP,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/connect/permissionSlip.vue"
        ),
      name: "Create-staff-apointment",
    },
    {
      path: Routes.CO_CREATE_SLIP,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/connect/creatSlip.vue"
        ),
      name: "Create-staff-apointment",
    },
    {
      path: Routes.CO_REMARKS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/connect/remarks.vue"
        ),
      name: "Create-staff-apointment",
    },
  ],
};
