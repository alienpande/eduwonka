import { MAIN } from "./main.menus";
export const Routes = {
  HQ_BASE: MAIN.HQ,
  HQ_DASHBOARD: MAIN.HQ + "/dashboard",
  HQ_STUDENT: MAIN.HQ + "/student",
  HQ_STUDENT_DETAILS : MAIN.HQ + "/student-details",
  HQ_STUDENT_FORM: MAIN.HQ + "/student-form",
  HQ_HEALTH_RECORD: MAIN.HQ + "/health-record",
  HQ_STUDENT_HEALTH_RECORD_FORM: MAIN.HQ + "/student-health-record",
  HQ_HEALTH_RECORD_FORM: MAIN.HQ + "/health-record-form",
  HQ_HEALTH_RECORD_VIEW: MAIN.HQ + "/health-record-detail",
  HQ_STANDARDS: MAIN.HQ + "/standards",
  HQ_STANDARD_FORM: MAIN.HQ + "/standard-form",
  HQ_LEAVE_MANAGEMENT_NEED_APPROVAL:
    MAIN.HQ + "/leave-management-need-approval",
  HQ_LEAVE_MANAGEMENT_RECORD_VIEW:
    MAIN.HQ + "/leave-need-approval-record-detail",
  HQ_LEAVE_MANAGEMENT_MARK_APPROVAL:
    MAIN.HQ + "/leave-management-mark-approval",
    HQ_LEAVE_MANAGEMENT_MARK_APPROVAL_INPROCESS_DETAIL : MAIN.HQ + "/leave-management-mark-approval-details",
    HQ_LEAVE_MANAGEMENT_MARK_APPROVAL_NEW_LEAVE_DETAIL: MAIN.HQ + "/leave-management-mark-approval-new-leave-details",
  HQ_EMPLOYEE: MAIN.HQ + "/employee",
  HQ_EMPLOYEE_FORM: MAIN.HQ + "/employee-form",
  HQ_EMPLOYEE_VIEW: MAIN.HQ + "/employee-detail",
  HQ_ENQUIRES: MAIN.HQ + "/enquires",
  HQ_ENQUIRES_PROSPECT_FORM: MAIN.HQ + "/enquires-prospect-form",
  HQ_ENQUIRES_PROSPECT_DETAIL: MAIN.HQ + "/enquires-prospect-detail",
  HQ_ENQUIRES_STUDENT_FORM: MAIN.HQ + "/enquires-student-form",
  HQ_ENQUIRES_STUDENT_DETAIL: MAIN.HQ + "/enquires-student-detail",
  HQ_SETTINGS: MAIN.HQ + "/settings",
  HQ_STANDARD_STUDENTS: MAIN.HQ + "/standard-students",
  
  HQ_STANDARD_TEACHERS: MAIN.HQ + "/standard-teachers",
  HQ_STANDARD_TEACHERS_ADD: MAIN.HQ + "/standard-teachers-create",

  HQ_STANDARD_INACTIVE_STUDENTS: MAIN.HQ + "/standard-inactive-students",
};

//#region HQ Menu
export const MainHeadQuater = [
  {
    id: 1,
    title: "Dashboard",
    to: Routes.HQ_DASHBOARD,
    icon: "hq/activity",
  },
  {
    id: 2,
    title: "Student",
    to: Routes.HQ_STUDENT,
    icon: "hq/student",
  },
  {
    id: 3,
    title: "Health Record",
    to: Routes.HQ_HEALTH_RECORD,
    icon: "hq/healthRecords",
  },
  {
    id: 4,
    title: "Standards",
    to: Routes.HQ_STANDARDS,
    icon: "hq/standards",
  },
  {
    id: 5,
    title: "Leave Management",
    to: "",
    icon: "hq/leaveManagement",
    routes: [
      {
        id: 81,
        title: "Need Approval",
        to: Routes.HQ_LEAVE_MANAGEMENT_NEED_APPROVAL,
      },
      {
        id: 82,
        title: "Mark Approvers",
        to: Routes.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL,
      },
    ],
  },
  {
    id: 6,
    title: "Employees",
    to: Routes.HQ_EMPLOYEE,
    icon: "hq/employees",
  },
  {
    id: 7,
    title: "Enquires",
    to: Routes.HQ_ENQUIRES,
    icon: "hq/enquires",
  },
  // {
  //     id: 8,
  //     title: "Settings",
  //     to: "",
  //     ficon: "settings",
  //     css: "bottom-menu-item",
  //     routes: [{
  //             id: 22,
  //             title: "HQ Setttings 1",
  //             to: Routes.HQ_SETTINGS,
  //         },
  //         {
  //             id: 23,
  //             title: "HQ Setttings 2",
  //             to: Routes.HQ_SETTINGS,
  //         },
  //         {
  //             id: 24,
  //             title: "HQ Setttings 3",
  //             to: Routes.HQ_SETTINGS,
  //         },
  //     ],
  // },
];
//#endregion
