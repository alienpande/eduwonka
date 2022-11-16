import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/learn.menus";
export default {
  path: Routes.LN_BASE,
  name: "Learn",
  meta: { layout: AppLayout.Home, permission: "teacher" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/teacher/learn/index.vue"),
  children: [
    {
      path: Routes.LN_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.LN_CLASSROOM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Classroom.vue"
        ),
      name: "Classroom",
    },
    {
      path:Routes.LN_CLASSROOM_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/AddClassForm.vue"
        ),
      name: "Classroom Form",
    },
    {
      path: Routes.LN_SYLLABUS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Syllabus.vue"
        ),
      name: "Syllabus",
    },
    {
      path: Routes.LN_COURSES,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Courses.vue"
        ),
      name: "Courses",
    },
    {
      path: Routes.LN_COURSES_INTRODUCTION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/course/introduction.vue"
        ),
      name: "Introduction",
    },
    {
      path: Routes.LN_COURSES_SYLLABUS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/course/syllabus.vue"
        ),
      name: "Syllabus",
    },
    {
      path: Routes.LN_COURSES_ASSESSMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/course/assessment.vue"
        ),
      name: "Assessment",
    },
    {
      path: Routes.LN_ASSIGNMENTS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Assignments.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_ASSIGNMENTS_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/assignment/createAssignment.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_ASSIGNMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/course/assignment.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_COURSECONTENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/course/courseContent.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_ANALYTICS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/course/analytics.vue"
        ),
      name: "Analytics",
    },
    {
      path: Routes.LN_COURSES_GRADECENTER,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/course/gradeCenter.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_ASSIGNMENTS_DETAILS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/assignment/details.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_CERTIFICATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Certificate.vue"
        ),
      name: "Certificate",
    },
    {
      path: Routes.LN_CERTIFICATE_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/CertificateForm.vue"
        ),
      name: "Certificate",
    },
   
  
    {
      path: Routes.LN_EXAM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Exam.vue"
        ),
      name: "Exam",
    },
    // {
    //   path: Routes.LN_EXAM_MATH,
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "Learn" */
    //       "@/views/teacher/learn/Exam.vue"
    //     ),
    //   name: "Exam",
    // },
    {
      path: Routes.LN_EXAM_SUBMISSION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/exam/submission.vue"
        ),
      name: "Details",
    },
    // LN_EXAM_ENVIRONMENT environment
    {
      path: Routes.LN_EXAM_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/exam/createTest.vue"
        ),
      name: "Exam",
    },
    {
      path: Routes.LN_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Form.vue"
        ),
      name: "FORM",
    },
    {
      path: Routes.LN_FORM_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/CreateForm.vue"
        ),
      name: "FORM",
    },
     {
      path: Routes.LN_FORM_SUBMISSION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/formSubmission.vue"
        ),
      name: "Form submission",
    },
    {
      path: Routes.LN_LESSON,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Lesson.vue"
        ),
      name: "Lesson",
    },
    {
      path: Routes.LN_LESSON_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/createLesson.vue"
        ),
      name: "Lesson Create",
    },
    {
      path: Routes.LN_POLL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Poll.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_POLL_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/createPoll.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_QUESTIONS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Question.vue"
        ),
      name: "LN_QUESTIONS",
    }, 
    {
      path: Routes.LN_CREATE_QUESTION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/createQues.vue"
        ),
      name: "Create question",
    }, 
    {
      path: Routes.LN_SKILL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Skill.vue"
        ),
      name: "Skill",
    },
    {
      path: Routes.LN_TASK,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Task.vue"
        ),
      name: "LN_TASK",
    },
    {
      path: Routes.LN_TIMETABLE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Timetable.vue"
        ),
      name: "LN_TIMETABLE",
    },
    {
      path: Routes.LN_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/learn/Settings.vue"
        ),
      name: "LN_SETTINGS",
    },
  ],
};
