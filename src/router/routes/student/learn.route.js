import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/learn.menus";
export default {
  path: Routes.LN_BASE,
  name: "Learn",
  meta: { layout: AppLayout.Home, permission: "student" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/student/learn/index.vue"),
  children: [
    {
      path: Routes.LN_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.LN_CLASSROOM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Classroom.vue"
        ),
      name: "Classroom",
    },
    {
      path: Routes.LN_CLASSROOM_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/AddClassForm.vue"
        ),
      name: "Classroom Form",
    },
    {
      path: Routes.LN_CLASS_JOIN + '/:classId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/class/joinClass.vue"
        ),
      name: "Classroom Form",
    },
    {
      path: Routes.LN_ONLINE_CLASS + '/:classId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/class/onlineClass.vue"
        ),
      name: "Classroom Form",
    },
    {
      path: Routes.LN_CLASS_CREATE_GROUP,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/class/createGroup.vue"
        ),
      name: "Classroom Form",
    },
    {
      path: Routes.LN_CLASS_DETAIL_GROUP,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/class/detailGroup.vue"
        ),
      name: "Classroom Form",
    },
    {
      path: Routes.LN_SYLLABUS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Syllabus.vue"
        ),
      name: "Syllabus",
    },
    {
      path: Routes.LN_SYLLABUS_DETAILS+ '/:id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/syllabus/SyllabusDetail.vue"
        ),
      name: "Syllabus",
    },
    {
      path: Routes.LN_COURSES,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Courses.vue"
        ),
      name: "Courses",
    },

    {
      path: Routes.LN_ASSIGNMENTS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Assignments.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_ASSIGNMENTS_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/assignment/createAssignment.vue"
        ),
      name: "Assignments",
    },

    {
      path: Routes.LN_ASSIGNMENTS_DETAILS+ '/:id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/assignment/details.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_ASSIGNMENTS_DETAILS_COMPLETE+ '/:id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/assignment/completeDetails.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_CERTIFICATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Certificate.vue"
        ),
      name: "Certificate",
    },
 
    {
      path: Routes.LN_ASSESMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/assesment.vue"
        ),
      name: "Assesment",
    },
    {
      path: Routes.LN_ASSESMENT_RESULT + '/:id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/assesment/result.vue"
        ),
      name: "Assesment",
    },
    {
      path: Routes.LN_ASSESMENT_QUICK_TEST + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/assesment/quickTest.vue"
        ),
      name: "Assesment",
    },

    {
      path: Routes.LN_EXAM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Exam.vue"
        ),
      name: "Exam",
    },
    // {
    //   path: Routes.LN_EXAM_MATH,
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "Learn" */
    //       "@/views/student/learn/Exam.vue"
    //     ),
    //   name: "Exam",
    // },
    {
      path: Routes.LN_EXAM_SUBMISSION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/exam/submission.vue"
        ),
      name: "Details",
    },
    // LN_EXAM_ENVIRONMENT environment
    {
      path: Routes.LN_EXAM_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/exam/createTest.vue"
        ),
      name: "Exam",
    },
    {
      path: Routes.LN_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Form.vue"
        ),
      name: "FORM",
    },
    {
      path: Routes.LN_FORM_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/CreateForm.vue"
        ),
      name: "FORM",
    },
    {
      path: Routes.LN_FORM_SUBMISSION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/formSubmission.vue"
        ),
      name: "Form submission",
    },
    {
      path: Routes.LN_LESSON,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Lesson.vue"
        ),
      name: "Lesson",
    },
    {
      path: Routes.LN_LESSON_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/createLesson.vue"
        ),
      name: "Lesson Create",
    },
    {
      path: Routes.LN_POLL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Poll.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_SURVAY_ACTIVE +'/form_id/:form_id' + '/form_results_id/:form_results_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/survayActive.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_SURVAY_COMPLETE +'/form_id/:form_id' + '/form_results_id/:form_results_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/survayComplete.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_POLL_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/createPoll.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_QUESTIONS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Question.vue"
        ),
      name: "LN_QUESTIONS",
    },
    {
      path: Routes.LN_CREATE_QUESTION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/createQues.vue"
        ),
      name: "Create question",
    },
    {
      path: Routes.LN_SKILL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Skill.vue"
        ),
      name: "Skill",
    },
    {
      path: Routes.LN_ADD_SKILL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/addSkill.vue"
        ),
      name: "Skill",
    },
    {
      path: Routes.LN_TASK,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Task.vue"
        ),
      name: "LN_TASK",
    },
    {
      path: Routes.LN_TIMETABLE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Timetable.vue"
        ),
      name: "LN_TIMETABLE",
    },
    {
      path: Routes.LN_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/learn/Settings.vue"
        ),
      name: "LN_SETTINGS",
    },
  ],
};