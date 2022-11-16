import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/learn.menus";
export default {
  path: Routes.LN_BASE,
  name: "Learn",
  meta: { layout: AppLayout.Home, permission: "parent" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/parent/learn/index.vue"),
  children: [
    {
      path: Routes.LN_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.LN_CLASSROOM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Classroom.vue"
        ),
      name: "Classroom",
    },
    {
      path:Routes.LN_CLASSROOM_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/AddClassForm.vue"
        ),
      name: "Classroom Form",
    },
    {
      path: Routes.LN_SYLLABUS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Syllabus.vue"
        ),
      name: "Syllabus",
    },
    {
      path: Routes.LN_COURSES,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Courses.vue"
        ),
      name: "Courses",
    },
    {
      path: Routes.LN_COURSES_INTRODUCTION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/course/introduction.vue"
        ),
      name: "Introduction",
    },
    {
      path: Routes.LN_COURSES_SYLLABUS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/course/syllabus.vue"
        ),
      name: "Syllabus",
    },
    {
      path: Routes.LN_COURSES_ASSESSMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/course/assessment.vue"
        ),
      name: "Assessment",
    },
    {
      path: Routes.LN_ASSIGNMENTS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Assignments.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_ASSIGNMENTS_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/assignment/createAssignment.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_ASSIGNMENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/course/assignment.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_COURSECONTENT,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/course/courseContent.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_COURSES_ANALYTICS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/course/analytics.vue"
        ),
      name: "Analytics",
    },
    {
      path: Routes.LN_COURSES_GRADECENTER,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/course/gradeCenter.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_ASSIGNMENTS_DETAILS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/assignment/details.vue"
        ),
      name: "Assignments",
    },
    {
      path: Routes.LN_CERTIFICATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Certificate.vue"
        ),
      name: "Certificate",
    },
    {
      path: Routes.LN_CERTIFICATE_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/CertificateForm.vue"
        ),
      name: "Certificate",
    },
   
  
    {
      path: Routes.LN_EXAM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Exam.vue"
        ),
      name: "Exam",
    },
    // {
    //   path: Routes.LN_EXAM_MATH,
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "Learn" */
    //       "@/views/parent/learn/Exam.vue"
    //     ),
    //   name: "Exam",
    // },
    {
      path: Routes.LN_EXAM_SUBMISSION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/exam/submission.vue"
        ),
      name: "Details",
    },
    // LN_EXAM_ENVIRONMENT environment
    {
      path: Routes.LN_EXAM_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/exam/createTest.vue"
        ),
      name: "Exam",
    },
    {
      path: Routes.LN_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Form.vue"
        ),
      name: "FORM",
    },
    {
      path: Routes.LN_FORM_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/CreateForm.vue"
        ),
      name: "FORM",
    },
     {
      path: Routes.LN_FORM_SUBMISSION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/formSubmission.vue"
        ),
      name: "Form submission",
    },
    {
      path: Routes.LN_LESSON,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Lesson.vue"
        ),
      name: "Lesson",
    },
    {
      path: Routes.LN_LESSON_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/createLesson.vue"
        ),
      name: "Lesson Create",
    },
    {
      path: Routes.LN_POLL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Poll.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_POLL_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/createPoll.vue"
        ),
      name: "Poll",
    },
    {
      path: Routes.LN_QUESTIONS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Question.vue"
        ),
      name: "LN_QUESTIONS",
    }, 
    {
      path: Routes.LN_CREATE_QUESTION,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/createQues.vue"
        ),
      name: "Create question",
    }, 
    {
      path: Routes.LN_SKILL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Skill.vue"
        ),
      name: "Skill",
    },
    {
      path: Routes.LN_TASK,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Task.vue"
        ),
      name: "LN_TASK",
    },
    {
      path: Routes.LN_TIMETABLE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Timetable.vue"
        ),
      name: "LN_TIMETABLE",
    },
    {
      path: Routes.LN_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/learn/Settings.vue"
        ),
      name: "LN_SETTINGS",
    },
  ],
};
