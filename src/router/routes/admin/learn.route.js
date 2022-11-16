import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/learn.menus";
export default {
  path: Routes.LN_BASE,
  name: "Learn",
  meta: { layout: AppLayout.Home, permission: "admin" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/admin/learn/index.vue"),
  children: [
    {
      path: Routes.LN_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Dashboard.vue"
        ),
      name: "LN_DASHBOARD",
    },
    {
      path: Routes.LN_CLASSROOM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Classroom.vue"
        ),
      name: "Classroom",
    },
    {
      path:Routes.LN_CLASSROOM_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/AddClassForm.vue"
        ),
      name: "Classroom Form",
    },
    {
      path: Routes.LN_SYLLABUS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Syllabus.vue"
        ),
      name: "Syllabus",
    },
    {
      path: Routes.LN_COURSES,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Courses.vue"
        ),
      name: "Courses",
    },
    {
      path: Routes.LN_COURSES_INTRODUCTION + '/:standardId/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/course/introduction.vue"
        ),
      name: "Introduction",
    },
    {
      path: Routes.LN_COURSES_SYLLABUS + '/:standardId/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/course/syllabus.vue"
        ),
      name: "Syllabus",
    },
    {
      path: Routes.LN_COURSES_ASSESSMENT + '/:standardId/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/course/assessment.vue"
        ),
      name: "Assessment",
    },
    {
      path: Routes.LN_ASSIGNMENTS + '/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Assignments.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_ASSIGNMENTS_CREATE + '/:standard_id/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/assignment/createAssignment.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_ASSIGNMENT + '/:standardId/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/course/assignment.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_COURSECONTENT + '/:standardId/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/course/courseContent.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_ANALYTICS + '/:standardId/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/course/analytics.vue"
        ),
      name: "Analytics",
    },
    {
      path: Routes.LN_COURSES_GRADECENTER + '/:standardId/:subjectId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/course/gradeCenter.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_ASSIGNMENTS_DETAILS+'/:assignmentId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/assignment/details.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_CERTIFICATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Certificate.vue"
        ),
      name: "Certificate",
    },
    {
      path: Routes.LN_CERTIFICATE_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/CertificateForm.vue"
        ),
      name: "Certificate",
    },
    {
      path: Routes.SH_CREATENEWTEMPLATE+ '/:id',
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/learn/contracts/create_new_template/index.vue"
        ),
      name: "SH_CREATENEWTEMPLATE",
    },

    {
      path: Routes.LN_EXAM + '/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Exam.vue"
        ),
      name: "Exam",
    },
    // {
    //   path: Routes.LN_EXAM_MATH,
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "Learn" */
    //       "@/views/admin/learn/Exam.vue"
    //     ),
    //   name: "Exam",
    // },
    {
      path: Routes.LN_EXAM_SUBMISSION + '/:resultAudienceId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/exam/submission.vue"
        ),
      name: "Details",
    },
    // LN_EXAM_ENVIRONMENT environment
    {
      path: Routes.LN_EXAM_FORM + '/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/exam/createTest.vue"
        ),
      name: "Exam",
    },
    {
      path: Routes.LN_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Form.vue"
        ),
      name: "FORM",
    },
    {
      path: Routes.LN_FORM_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/CreateForm.vue"
        ),
      name: "FORM",
    },
     {
      path: Routes.LN_FORM_SUBMISSION + '/audience/:id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/formSubmission.vue"
        ),
      name: "Form submission",
    },
    {
      path: Routes.LN_LESSON,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Lesson.vue"
        ),
      name: "Lesson",
    },
    {
      path: Routes.LN_LESSON_DETAILS + '/:id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/LessonDetails.vue"
        ),
      name: "Lesson",
    },
    {
      path: Routes.LN_LESSON_CREATE + '/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/createLesson.vue"
        ),
      name: "Lesson Create",
    },
    {
      path: Routes.LN_POLL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Poll.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_POLL_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/createPoll.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_QUESTIONS + '/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Question.vue"
        ),
      name: "LN_QUESTIONS",
    },
    {
      path: Routes.LN_CREATE_QUESTION + '/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/createQues.vue"
        ),
      name: "Create question",
    },
    {
      path: Routes.LN_SKILL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Skill.vue"
        ),
      name: "Skill",
    },
    {
      path: Routes.LN_SKILL_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/SkillCreate.vue"
        ),
      name: "Skill",
    },
    {
      path: Routes.LN_SKILL_VIEW + '/:id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/SkillView.vue"
        ),
      name: "Skill",
    },

    {
      path: Routes.LN_TASK,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Task.vue"
        ),
      name: "LN_TASK",
    },
    {
      path: Routes.LN_TIMETABLE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Timetable.vue"
        ),
      name: "LN_TIMETABLE",
    },
    {
      path: Routes.LN_TIMETABLE_EDIT + '/:standardId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/TimetableEdit.vue"
        ),
      name: "LN_TIMETABLE",
    },
    {
      path: Routes.LN_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/Settings.vue"
        ),
      name: "LN_SETTINGS",
    },
    {
      path: Routes.LN_ONLINE_CLASS + '/:classId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/learn/class/onlineClass.vue"
        ),
      name: "Classroom Form",
    },
  ],
};
