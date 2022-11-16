import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/finance.menus";
export default {
  path: Routes.FI_BASE,
  name: "finance",
  meta: { layout: AppLayout.Home, permission: "parent" },
  component: () =>
    import(/* webpackChunkName: "finance" */ "@/views/parent/finance/index.vue"),
  children: [
    {
      path: Routes.FI_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.FI_EXPENSES,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/Expenses.vue"
        ),
      name: "Expenses",
    },
    {
      path: Routes.FI_EXPENSES_ADD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/expenses/addExpenses.vue"
        ),
      name: "Expenses",
    },
    {
      path: Routes.FI_EXPENSES_DETAILS,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/expenses/detailsExpenses.vue"
        ),
      name: "Expenses Details",
    },

    

   
    {
      path: Routes.FI_FEE_RECEIPTS,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/FeeReceipts.vue"
        ),
      name: "FeeReceipts",
    },
    {
      path: Routes.FI_FEE_RECEIPTS_ADD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/FeeReceipts/addFee.vue"
        ),
      name: "FeeReceipts Add",
    },
    {
      path: Routes.FI_FEE_RECEIPTS_DETAILS,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/FeeReceipts/detailsAddFee.vue"
        ),
      name: "FeeReceipts Details",
    },
    {
      path: Routes.FI_FEE_VIEW,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/FeeReceipts/viewFee.vue"
        ),
      name: "FeeReceipts Details",
    },
    {
      path: Routes.FI_INVOICE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/Invoice.vue"
        ),
      name: "Invoice",
    },
    {
      path: Routes.FI_INVOICE_ADD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/invoice/addInvoice.vue"
        ),
      name: "Invoice",
    },
    {
      path: Routes.FI_INVOICE_VIEW,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/invoice/viewInvoice.vue"
        ),
      name: "Invoice",
    },
    {
      path: Routes.FI_PAYSLIP,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/PaySlip.vue"
        ),
      name: "PaySlip",
    },
    {
      path: Routes.FI_PAYSLIP_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/payslip/createPayslip.vue"
        ),
      name: "PaySlip",
    },
    {
      path: Routes.FI_PAYSLIP_EMPLOYEE_DETAILS,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/payslip/employDetails.vue"
        ),
      name: "PaySlip",
    },
    {
      path: Routes.FI_PAYSLIP_DETAILS,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/payslip/payslipDetail.vue"
        ),
      name: "PaySlip",
    },
    {
      path: Routes.FI_TASK,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/Task.vue"
        ),
      name: "FITask",
    },
    {
      path: Routes.FI_TASK_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/createTask.vue"
        ),
      name: "FITask",
    },
    {
      path: Routes.FI_TASK_VIEW,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/viewTask.vue"
        ),
      name: "FITask",
    },

    {
      path: Routes.FI_VENDOR,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/Vendor.vue"
        ),
      name: "FI_VENDOR",
    },
    {
      path: Routes.FI_VENDOR_ADD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/addVendor.vue"
        ),
      name: "FI_VENDOR",
    },
    {
      path: Routes.FI_VENDOR_VIEW,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/viewVendor.vue"
        ),
      name: "FI_VENDOR",
    },
    {
      path: Routes.FI_SETTINGS_TERM,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/setting/termCreation.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_TEARM_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/setting/createTermCreation.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_SETTINGS_STANDARD_FEE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/setting/standardFee.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_CREATE_STANDARD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/setting/createStandardFee.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_SETTING_STUDENT_FEE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/setting/studentee.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_SETTING_STUDENT_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/setting/createStudentFee.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_SETTINGS_PAYSLIP_LINE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/parent/finance/setting/payslipLine.vue"
        ),
      name: "Settings",
    },
    
  ],
};
