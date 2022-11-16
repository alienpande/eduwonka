import { MAIN } from "./main.menus";
export const Routes = {
  SH_BASE: MAIN.SCHOOL,
  SH_OVERVIEW: MAIN.SCHOOL + "/overview",
  SH_EXAM: MAIN.SCHOOL + "/exam",
  SH_CREATEEXAM: MAIN.SCHOOL + "/createexam",
  SH_GRADEMARK: MAIN.SCHOOL + "/grademark",
  SH_ATTENDANCE: MAIN.SCHOOL + "/attendance",
  SH_EVENT_CALENDER: MAIN.SCHOOL + "/event-calender",
  SH_CREATE_EVENT: MAIN.SCHOOL + "/create-event",
  SH_GRADE_ANALYSIS: MAIN.SCHOOL + "/grade-analysis",
  SH_REPORT_CARD: MAIN.SCHOOL + "/report-card",
  SH_ESIGN: MAIN.SCHOOL + "/esign",
  SH_CREATETEMPLATE: MAIN.SCHOOL + "/create-template",
  SH_REPORT_DETAIL: MAIN.SCHOOL + "/report-card/detail",
  SH_SETTINGS: MAIN.SCHOOL + "/settings",
};

//#region School Menu
export const School = [
  {
    id: 1,
    title: "Overview",
    to: Routes.SH_OVERVIEW,
    icon: "school/overview",
  },
  {
    id: 2,
    title: "Exam",
    action: "EXAM_MENU",
    link:Routes.SH_EXAM+'/subject/:subject_id',
    icon: "school/exam",
  },
  {
    id: 3,
    title: "Attendance",
    to: Routes.SH_ATTENDANCE,
    icon: "school/attendance",
  },
  {
    id: 4,
    title: "Event Calender",
    to: Routes.SH_EVENT_CALENDER,
    icon: "school/events",
  },
  {
    id: 5,
    title: "Grade Analysis",
    to: Routes.SH_GRADE_ANALYSIS,
    icon: "school/grade",
  },
  {
    id: 6,
    title: "Report Card",
    to: Routes.SH_REPORT_CARD,
    icon: "school/reportcard",
  },
  {
    id: 8,
    title: "ESign",
    to: Routes.SH_ESIGN,
    icon: "school/reportcard",
  },
  {
    id: 7,
    title: "Settings",
    to: "",
    ficon: "settings",
    css: "bottom-menu-item",
    routes: [
      {
        id: 22,
        title: "School S1",
        to: Routes.SH_SETTINGS,
      },
      {
        id: 23,
        title: "School S2",
        to: Routes.SH_SETTINGS,
      },
    ],
  },
];
//#endregion
