import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/school.menus";
export default {
  path: Routes.SH_BASE,
  name: "school",
  meta: { layout: AppLayout.Home, permission: "admin" },
  component: () =>
    import(/* webpackChunkName: "school" */ "@/views/admin/school/index.vue"),
  children: [
    {
      path: Routes.SH_OVERVIEW,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/Overview.vue"
        ),
      name: "SH_OVERVIEW",
    },
    {
      path: Routes.SH_EXAM+'/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/Exam.vue"
        ),
      name: "SH_EXAM",
    },
    {
      path: Routes.SH_CREATEEXAM+'/standard/:standardId/subject/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/CreateExam.vue"
        ),
      name: "SH_CREATEEXAM",
    },
    {
      path: Routes.SH_GRADEMARK + '/standard/:standard_id/subject/:subject_id/:exam_id',
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/MarkGrade.vue"
        ),
      name: "SH_GRADEMARK",
    },
    {
      path: Routes.SH_ATTENDANCE,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/Attendance.vue"
        ),
      name: "SH_ATTENDANCE",
    },
    {
      path: Routes.SH_EVENT_CALENDER,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/EventCalender.vue"
        ),
      name: "SH_EVENT_CALENDER",
    },
    {
      path: Routes.SH_CREATE_EVENT,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/Event/EventForm.vue"
        ),
      name: "SH_CREATE_EVENT",
    },
    {
      path: Routes.SH_GRADE_ANALYSIS,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/GradeAnalysis.vue"
        ),
      name: "SH_GRADE_ANALYSIS",
    },
    {
      path: Routes.SH_REPORT_CARD,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/ReportCard.vue"
        ),
      name: "SH_REPORT_CARD",
    },
    {
      path: Routes.SH_ESIGN,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/Esign.vue"
        ),
      name: "SH_ESIGN",
    },
    {
      path: Routes.SH_CREATETEMPLATE+ '/:id',
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/contracts/create_new_template/index.vue"
        ),
      name: "SH_CREATETEMPLATE",
    },
    {
      path: Routes.SH_REPORT_DETAIL+ '/:id'+ '/:examId',
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/ReportDetail.vue"
        ),
      name: "SH_REPORT_DETAIL",
    },
    {
      path: Routes.SH_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/school/Settings.vue"
        ),
      name: "SH_SETTINGS",
    },
  ],
};
