import { MAIN } from "./main.menus";
export const Routes = {
  LN_BASE: MAIN.CONNECT,
  CO_DASHBOARD: MAIN.CONNECT + "/dashbaord",
  CO_MESSENGERS: MAIN.CONNECT + "/messenger",
  CO_MESSENGER: MAIN.CONNECT + "/messenger-connect",
  CO_MESSENGER_CREATE: MAIN.CONNECT + "/create-channel",
  CO_APPOINTMENT: MAIN.CONNECT + "/appointment",
  CO_REMARKS: MAIN.CONNECT + "/remarks",
  CO_PERMISSION_SLIP: MAIN.CONNECT + "/permission-slip",
  CO_CREATE_SLIP: MAIN.CONNECT + "/create-permission-slip",
  CO_STAFF_APOINTMENT: MAIN.CONNECT + "/staff-apointment",
  CO_PARENT_APPOINTMENT: MAIN.CONNECT + "/parent-apointment",
  CO_STUDENT_APPOINTMENT: MAIN.CONNECT + "/student-apointment",
  CO_STAFF_APOINTMENTCREATE :MAIN.CONNECT + "/createstaff-apointment",
  CO_ONLINE_MEET :MAIN.CONNECT + "/online-meet",
};

//#region Connect Menu
export const Connect = [
  {
    id: 1,
    title: "Dashboard",
    to: Routes.CO_DASHBOARD,
    icon: "learn/activity",
  },
  {
    id: 2,
    title: "Messenger",
    link: Routes.CO_MESSENGERS,
    icon: "learn/folder",
    action: "MSG_MENU",
  },
  {
    id: 3,
    title: "Appointment",
    to: Routes.CO_DASHBOARD,
    icon: "school/events",
    routes: [
      {
        id: 22,
        title: "Staff Appointment",
        to: Routes.CO_STAFF_APOINTMENT,
      },
      {
        id: 23,
        title: "Parent appointment",
        to: Routes.CO_PARENT_APPOINTMENT,
      },
      {
        id: 24,
        title: "Student appointment",
        to: Routes.CO_STUDENT_APPOINTMENT,
      },
      {
        id: 25,
        title: "Lorem appointment",
        to: Routes.CO_LOREM_APPONTMENT,
      },
    ],
  },
  {
    id: 4,
    title: "Remarks",
    to: Routes.CO_REMARKS,
    icon: "learn/activity",
  },
  {
    id: 5,
    title: "Permission Slips",
    to: Routes.CO_PERMISSION_SLIP,
    icon: "learn/assignment",
  },

  {
    id: 15,
    title: "Settings",
    to: "",
    ficon: "settings",
    css: "bottom-menu-item",
    routes: [
      {
        id: 22,
        title: "School S1",
        to: Routes.CO_DASHBOARD,
      },
      {
        id: 23,
        title: "School S2",
        to: Routes.CO_DASHBOARD,
      },
    ],
  },
];
//#endregion
