import { MAIN } from "./main.menus";
export const Routes = {
  FI_BASE: MAIN.FINANCE,
  FI_DASHBOARD: MAIN.FINANCE + "/dashbaord",
  FI_FEE_RECEIPTS: MAIN.FINANCE + "/fee-receipts",
  FI_FEE_RECEIPTS_ADD: MAIN.FINANCE + "/add-fee-receipts",
  FI_FEE_VIEW:MAIN.FINANCE + "/view-fee",
  FI_FEE_RECEIPTS_DETAILS:MAIN.FINANCE + "/details-fee-receipts",
  FI_EXPENSES: MAIN.FINANCE + "/expenses",
  FI_EXPENSES_ADD: MAIN.FINANCE + "/expenses-add",
  FI_EXPENSES_DETAILS: MAIN.FINANCE + "/expenses-details",
  FI_PAYSLIP: MAIN.FINANCE + "/payslips",
  FI_PAYSLIP_CREATE: MAIN.FINANCE + "/create-payslips",
  FI_PAYSLIP_EMPLOYEE_DETAILS: MAIN.FINANCE + "/payslips-employee-details",
  FI_PAYSLIP_DETAILS: MAIN.FINANCE + "/payslips-payslip-details",
  FI_INVOICE: MAIN.FINANCE + "/invoice",
  FI_INVOICE_ADD: MAIN.FINANCE + "/invoice-add",
  FI_INVOICE_VIEW: MAIN.FINANCE + "/invoice-view",
  FI_VENDOR: MAIN.FINANCE + "/vendor",
  FI_VENDOR_ADD: MAIN.FINANCE + "/add-vendor",
  FI_VENDOR_VIEW: MAIN.FINANCE + "/view-vendor",
  FI_TASK: MAIN.FINANCE + "/task",
  FI_TASK_CREATE:MAIN.FINANCE + "/task-create",
  FI_TASK_VIEW:MAIN.FINANCE + "/task-view",
  FI_SETTINGS_TERM: MAIN.FINANCE + "/term-creation",
  FI_TEARM_CREATE:MAIN.FINANCE + "/create-term-creation",
  FI_SETTINGS_STANDARD_FEE: MAIN.FINANCE + "/standard-fee",
  FI_CREATE_STANDARD:MAIN.FINANCE + "/create-standard-fee",
  FI_SETTING_STUDENT_FEE: MAIN.FINANCE + "/student-fee",
  FI_SETTING_STUDENT_CREATE:MAIN.FINANCE + "/create-student-fee",

  FI_SETTINGS_PAYSLIP_LINE: MAIN.FINANCE + "/payslip-line",
};

//#region Finance Menu
export const Finance = [
  {
    id: 1,
    title: "Dashboard",
    to: Routes.FI_DASHBOARD,
    icon: "finance/activity",
  },
  {
    id: 2,
    title: "Fee Receipts",
    to: Routes.FI_FEE_RECEIPTS,
    icon: "finance/receipt",
  },
  {
    id: 3,
    title: "Expenses",
    to: Routes.FI_EXPENSES,
    icon: "finance/expenses",
  },
  {
    id: 4,
    title: "Pay Slips",
    to: Routes.FI_PAYSLIP,
    icon: "finance/slips",
  },
  {
    id: 5,
    title: "Invoice",
    to: Routes.FI_INVOICE,
    icon: "finance/bill",
  },
  {
    id: 6,
    title: "Vendor",
    to: Routes.FI_VENDOR,
    icon: "finance/group",
  },
  {
    id: 7,
    title: "Task",
    to: Routes.FI_TASK,
    icon: "finance/task",
  },
  {
    id: 8,
    title: "Settings",
    to: "",
    ficon: "settings",
    css: "bottom-menu-item",
    routes: [
      {
        id: 22,
        title: "Term Creation",
        to: Routes.FI_SETTINGS_TERM,
        icon: "finance/book",
      },
      {
        id: 23,
        title: "Standard Fee Line Item",
        to: Routes.FI_SETTINGS_STANDARD_FEE,
        icon: "finance/sunrise",
      },
      {
        id: 24,
        title: "Student Fee Line Item",
        to: Routes.FI_SETTING_STUDENT_FEE,
        icon: "finance/book",
      },
      {
        id: 25,
        title: "Payslip Line item",
        to: Routes.FI_SETTINGS_PAYSLIP_LINE,
        icon: "finance/sunrise",
      },
    ],
  },
];
//#endregion
