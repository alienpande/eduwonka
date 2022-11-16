import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/onboarding.menus";
export default [
  {
    path: Routes.INSTITUTE_ONBOARD,
    name: "PublicRoutes",
    meta: { layout: AppLayout.Default, permission: "admin" },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/InstituteOnboarding.vue"
      ),
  },
  {
    path: Routes.INSTITUTE_DASHBOARD,
    name: "PublicRoutes",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/InstituteDashboard.vue"
      ),
  },
  {
    path: Routes.LIST_OF_CAMPUS+'/:institute_id',
    name: "PublicRoutesCampusList",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/ListOfCampus.vue"
      ),
  },
  {
    path: Routes.ONBOARD_CAMPUS+'/:id',
    name: "OnboardCampusByID",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/OnboardingCampus.vue"
      ),
  },
  {
    path: Routes.INVITE_PEOPLE+ '/:id',
    name: "INVITE_PEOPLE",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/InvitePeople.vue"
      ),
  },
  {
    path: Routes.ADMIN_ACCESS,
    name: "ADMIN_ACCESS",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/AdminAccess.vue"
      ),
  },
  {
    path: Routes.DEPARTMENT_DESIGNATION + '/:id',
    name: "DEPARTMENT_DESIGNATION",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/DepartmentAndDesignation.vue"
      ),
  },
  {
    path: Routes.BASIC_FINANCIAL + '/:id',
    name: "BASIC_FINANCIAL",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/FinanceSetup.Step1.vue"
      ),
  },
  {
    path: Routes.PAY_SLIP_LINE_ITEM + '/:id',
    name: "PAY_SLIP_LINE_ITEM",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/FinanceSetup.Step2.vue"
      ),
  },
  {
    path: Routes.CAMPUS_BASIC_DETAIL + '/:id/:accountId',
    name: "CAMPUS_BASIC_DETAIL",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/BasicDetails.vue"
      ),
  },
  {
    path: Routes.SUBJECT_CREATION + '/:id',
    name: "SUBJECT_CREATION",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/SubjectCreation.vue"
      ),
  },
  {
    path: Routes.ASSIGN_SUBJECT + '/:id',
    name: "ASSIGN_SUBJECT",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/AssignSubject.vue"
      ),
  },
  {
    path: Routes.ATTENDANCE_AND_EXAM + '/:id',
    name: "ATTENDANCE_AND_EXAM",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/AttendanceAndExamDetails.vue"
      ),
  },
  {
    path: Routes.LEVEL_CREATION_STEP1,
    name: "LEVEL_CREATION_STEP1",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/LevelCreation.Step1.vue"
      ),
  },
  {
    path: Routes.LEVEL_CREATION_STEP2,
    name: "LEVEL_CREATION_STEP2",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/LevelCreation.Step2.vue"
      ),
  },
  {
    path: Routes.STANDARD_SEQUENCING,
    name: "STANDARD_SEQUENCING",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/StandardSequening.vue"
      ),
  },
  {
    path: Routes.WORKING_HOURS + '/:id',
    name: "WORKING_HOURS",
    meta: { layout: AppLayout.HomeLite },
    component: () =>
      import(
        /* webpackChunkName: "Auth" */
        "@/views/admin/on-boarding/campus/progress/WorkingHours.vue"
      ),
  },
];
