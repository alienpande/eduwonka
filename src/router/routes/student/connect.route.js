import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/connect.menus";
export default {
  path: Routes.LN_BASE,
  name: "Connect",
  meta: { layout: AppLayout.Home, permission: "student" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/student/connect/index.vue"),
  children: [
    {
      path: Routes.CO_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.CO_MESSENGER,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/Messenger.vue"
        ),
      name: "Messenger",
    },
    {
      path: Routes.CO_MESSENGERS + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/messengers.vue"
        ),
      name: "Messenger",
    },
    {
      path: Routes.CO_MESSENGER_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/MessengerCreate.vue"
        ),
      name: "Messenger",
    },
    {
      path: Routes.CO_STAFF_APOINTMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/appointment/staffAppointment.vue"
        ),
      name: "Messenger-staff-apointment",
    },
    {
      path: Routes.CO_PARENT_APPOINTMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/appointment/parentAppointment.vue"
        ),
      name: "Messenger-parent-apointment",
    },
    {
      path: Routes.CO_STUDENT_APPOINTMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/appointment/studentAppointment.vue"
        ),
      name: "Messenger-student-apointment",
    },
    {
      path: Routes.CO_STAFF_APOINTMENTCREATE + '/:type',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/appointment/createAppointment.vue"
        ),
      name: "Create-staff-apointment",
    },
    {
      path: Routes.CO_PERMISSION_SLIP,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/permissionSlip.vue"
        ),
      name: "Create-staff-apointment",
    },
    {
      path: Routes.CO_CREATE_SLIP,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/creatSlip.vue"
        ),
      name: "Create-staff-apointment",
    },
    {
      path: Routes.CO_REMARKS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/connect/remarks.vue"
        ),
      name: "Create-staff-apointment",
    },
  ],
};
