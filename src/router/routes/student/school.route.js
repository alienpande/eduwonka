import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/school.menus";
export default {
  path: Routes.SH_BASE,
  name: "school",
  meta: { layout: AppLayout.Home, permission: "student" },
  component: () =>
    import(/* webpackChunkName: "school" */ "@/views/student/school/index.vue"),
  children: [
    {
      path: Routes.SH_OVERVIEW,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/Overview.vue"
        ),
      name: "SH_OVERVIEW",
    },
    {
      path: Routes.SH_EXAM + '/subject/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/Exam.vue"
        ),
      name: "SH_EXAM",
    },
    {
      path: Routes.SH_CREATEEXAM,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/CreateExam.vue"
        ),
      name: "SH_CREATEEXAM",
    },
    {
      path: Routes.SH_GRADEMARK,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/MarkGrade.vue"
        ),
      name: "SH_GRADEMARK",
    },
    {
      path: Routes.SH_ATTENDANCE,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/Attendance.vue"
        ),
      name: "SH_ATTENDANCE",
    },
    {
      path: Routes.SH_EVENT_CALENDER,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/EventCalender.vue"
        ),
      name: "SH_EVENT_CALENDER",
    },
    {
      path: Routes.SH_CREATE_EVENT,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/Event/EventForm.vue"
        ),
      name: "SH_CREATE_EVENT",
    },
    {
      path: Routes.SH_GRADE_ANALYSIS,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/GradeAnalysis.vue"
        ),
      name: "SH_GRADE_ANALYSIS",
    },
    {
      path: Routes.SH_REPORT_CARD,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/ReportCard.vue"
        ),
      name: "SH_REPORT_CARD",
    },
    {
      path: Routes.SH_REPORT_DETAIL,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/ReportDetail.vue"
        ),
      name: "SH_REPORT_DETAIL",
    },
    {
      path: Routes.SH_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/school/Settings.vue"
        ),
      name: "SH_SETTINGS",
    },
  ],
};
