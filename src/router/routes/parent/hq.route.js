import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/hq.menus";
export default {
  path: Routes.HQ_BASE,
  name: "MainHeadQuater",
  meta: { layout: AppLayout.Home, permission: "parent" },
  component: () =>
    import(/* webpackChunkName: "Headquater" */ "@/views/parent/hq/index.vue"),
  children: [
    {
      path: Routes.HQ_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.HQ_STUDENT,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Student.vue"
        ),
      name: "Student",
    },
    {
      path: Routes.HQ_STUDENT_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Student/StudentForm.vue"
        ),
      name: "StudentForm",
    },
    {
      path: Routes.HQ_HEALTH_RECORD,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/HealthRecords.vue"
        ),
      name: "HealthRecords",
    },
    {
      path: Routes.HQ_HEALTH_RECORD_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/HealthRecord/HealthRecordForm.vue"
        ),
      name: "HealthRecordForm",
    },
    {
      path: Routes.HQ_HEALTH_RECORD_VIEW,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/HealthRecord/HealthRecordDetail.vue"
        ),
      name: "HealthRecordDetail",
    },
    {
      path: Routes.HQ_STANDARDS,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Standards.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_STANDARD_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Standards/StandardForm.vue"
        ),
      name: "StandardForm",
    },
    {
      path: Routes.HQ_STANDARD_STUDENTS + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Standards/StandardStudents.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_STANDARD_INACTIVE_STUDENTS + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Standards/StandardInactiveStudents.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_STANDARD_TEACHERS + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Standards/StandardTeachers.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/LeaveManagement/MarkApproval.vue"
        ),
      name: "LeaveManagementMark",
    },
    {
      path: Routes.HQ_LEAVE_MANAGEMENT_NEED_APPROVAL,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/LeaveManagement/NeedApproval.vue"
        ),
      name: "LeaveManagementNeed",
    },
    {
      path: Routes.HQ_LEAVE_MANAGEMENT_RECORD_VIEW,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/LeaveManagement/NeedApprovalRecordDetail.vue"
        ),
      name: "LeaveManagementNeedRecordDetail",
    },
    {
      path: Routes.HQ_EMPLOYEE,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Employees.vue"
        ),
      name: "Employees",
    },
    {
      path: Routes.HQ_EMPLOYEE_VIEW,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Employee/EmployeeDetail.vue"
        ),
      name: "HQ_EMPLOYEE_VIEW",
    },
    {
      path: Routes.HQ_EMPLOYEE_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Employee/EmployeeForm.vue"
        ),
      name: "HQ_EMPLOYEE_FORM",
    },
    {
      path: Routes.HQ_ENQUIRES,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Enquires.vue"
        ),
      name: "Enquires",
    },
    {
      path: Routes.HQ_ENQUIRES_PROSPECT_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Enquiry/EnquiryProspectForm.vue"
        ),
      name: "EnquiryProspectForm",
    },
    {
      path: Routes.HQ_ENQUIRES_PROSPECT_DETAIL,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Enquiry/EnquiryProspectDetail.vue"
        ),
      name: "EnquiryProspectDetail",
    },
    {
      path: Routes.HQ_ENQUIRES_STUDENT_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Enquiry/EnquiryStudentForm.vue"
        ),
      name: "EnquiryStudentForm",
    },
    {
      path: Routes.HQ_ENQUIRES_STUDENT_DETAIL,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Enquiry/EnquiryStudentDetail.vue"
        ),
      name: "EnquiryStudentDetail",
    },
    {
      path: Routes.HQ_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/parent/hq/Settings.vue"
        ),
      name: "Settings",
    },
  ],
};
