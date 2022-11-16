import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/finance.menus";
export default {
  path: Routes.FI_BASE,
  name: "finance",
  meta: { layout: AppLayout.Home, permission: "admin" },
  component: () =>
    import(/* webpackChunkName: "finance" */ "@/views/admin/finance/index.vue"),
  children: [
    {
      path: Routes.FI_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.FI_EXPENSES,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/Expenses.vue"
        ),
      name: "Expenses",
    },
    {
      path: Routes.FI_EXPENSES_ADD + '/:type',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/expenses/addExpenses.vue"
        ),
      name: "Expenses",
    },
    {
      path: Routes.FI_EXPENSES_DETAILS+ '/:id',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/expenses/detailsExpenses.vue"
        ),
      name: "Expenses Details",
    },

    

   
    {
      path: Routes.FI_FEE_RECEIPTS,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/FeeReceipts.vue"
        ),
      name: "FeeReceipts",
    },
    {
      path: Routes.FI_FEE_RECEIPTS_ADD + '/student/:studentId',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/FeeReceipts/addFee.vue"
        ),
      name: "FeeReceipts Add",
    },
    {
      path: Routes.FI_FEE_RECEIPTS_DETAILS,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/FeeReceipts/detailsAddFee.vue"
        ),
      name: "FeeReceipts Details",
    },
    {
      path: Routes.FI_FEE_VIEW+ '/:id',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/FeeReceipts/viewFee.vue"
        ),
      name: "FeeReceipts Details",
    },
    {
      path: Routes.FI_INVOICE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/Invoice.vue"
        ),
      name: "Invoice",
    },
    {
      path: Routes.FI_INVOICE_ADD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/invoice/addInvoice.vue"
        ),
      name: "Invoice",
    },
    {
      path: Routes.FI_INVOICE_VIEW+ '/:id',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/invoice/viewInvoice.vue"
        ),
      name: "Invoice",
    },
    {
      path: Routes.FI_PAYSLIP,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/PaySlip.vue"
        ),
      name: "PaySlip",
    },
    {
      path: Routes.FI_PAYSLIP_CREATE + '/:campusId',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/payslip/createPayslip.vue"
        ),
      name: "PaySlip",
    },
    {
      path: Routes.FI_PAYSLIP_EMPLOYEE_DETAILS,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/payslip/employDetails.vue"
        ),
      name: "PaySlip",
    },
    {
      path: Routes.FI_PAYSLIP_DETAILS + '/:id',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/payslip/payslipDetail.vue"
        ),
      name: "PaySlip",
    },
    {
      path: Routes.FI_TASK,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/Task.vue"
        ),
      name: "FITask",
    },
    {
      path: Routes.FI_TASK_CREATE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/createTask.vue"
        ),
      name: "FITask",
    },
    {
      path: Routes.FI_TASK_VIEW + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/viewTask.vue"
        ),
      name: "FITask",
    },

    {
      path: Routes.FI_VENDOR,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/Vendor.vue"
        ),
      name: "FI_VENDOR",
    },
    {
      path: Routes.FI_VENDOR_ADD,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/addVendor.vue"
        ),
      name: "FI_VENDOR",
    },
    {
      path: Routes.FI_VENDOR_VIEW+"/:id",
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/viewVendor.vue"
        ),
      name: "FI_VENDOR",
    },
    {
      path: Routes.FI_SETTINGS_TERM,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/setting/termCreation.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_TEARM_CREATE + '/:id',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/setting/createTermCreation.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_SETTINGS_STANDARD_FEE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/setting/standardFee.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_CREATE_STANDARD + '/:standardId',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/setting/createStandardFee.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_SETTING_STUDENT_FEE,
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/setting/studentee.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_SETTING_STUDENT_CREATE + '/:studentId',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/setting/createStudentFee.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.FI_SETTINGS_PAYSLIP_LINE + '/:campusId',
      component: () =>
        import(
          /* webpackChunkName: "finance" */
          "@/views/admin/finance/setting/payslipLine.vue"
        ),
      name: "Settings",
    },
    
  ],
};
