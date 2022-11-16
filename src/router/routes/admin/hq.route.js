import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/hq.menus";
export default {
  path: Routes.HQ_BASE,
  name: "MainHeadQuater",
  meta: { layout: AppLayout.Home, permission: "admin" },
  component: () =>
    import(/* webpackChunkName: "Headquater" */ "@/views/admin/hq/index.vue"),
  children: [
    {
      path: Routes.HQ_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.HQ_STUDENT,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Student.vue"
        ),
      name: "Student",
    },
    {
      path: Routes.HQ_STUDENT_DETAILS + "/:specificStudentId",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Student/Studentdetails.vue"
        ),
      name: "Student",
    },
    {
      path: Routes.HQ_STUDENT_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Student/StudentForm.vue"
        ),
      name: "StudentForm",
    },
    {
      path: Routes.HQ_HEALTH_RECORD,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/HealthRecords.vue"
        ),
      name: "HealthRecords",
    },
    {
      path: Routes.HQ_STUDENT_HEALTH_RECORD_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/HealthRecord/StudentHealthRecord.vue"
        ),
      name: "StudentHealthRecordForm",
    },
    {
      path: Routes.HQ_HEALTH_RECORD_FORM + "/:studentId",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/HealthRecord/HealthRecordForm.vue"
        ),
      name: "HealthRecordForm",
    },
    {
      path: Routes.HQ_HEALTH_RECORD_VIEW + "/:studentId",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/HealthRecord/HealthRecordDetail.vue"
        ),
      name: "HealthRecordDetail",
    },
    {
      path: Routes.HQ_STANDARDS,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Standards.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_STANDARD_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Standards/StandardForm.vue"
        ),
      name: "StandardForm",
    },
    {
      path: Routes.HQ_STANDARD_STUDENTS + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Standards/StandardStudents.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_STANDARD_INACTIVE_STUDENTS + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Standards/StandardInactiveStudents.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_STANDARD_TEACHERS + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Standards/StandardTeachers.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_STANDARD_TEACHERS_ADD,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Standards/createStandardTeachers.vue"
        ),
      name: "Standards",
    },
    {
      path: Routes.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/LeaveManagement/MarkApproval.vue"
        ),
      name: "LeaveManagementMark",
    },
    {
      path: Routes.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL_INPROCESS_DETAIL+ "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/LeaveManagement/inprocessLeaveDetail.vue"
        ),
      name: "LeaveManagementMark",
    },
    {
      path: Routes.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL_NEW_LEAVE_DETAIL + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/LeaveManagement/newLeavesDetail.vue"
        ),
      name: "LeaveManagementMark",
    },
    {
      path: Routes.HQ_LEAVE_MANAGEMENT_NEED_APPROVAL,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/LeaveManagement/NeedApproval.vue"
        ),
      name: "LeaveManagementNeed",
    },
    {
      path: Routes.HQ_LEAVE_MANAGEMENT_RECORD_VIEW+ "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/LeaveManagement/NeedApprovalRecordDetail.vue"
        ),
      name: "LeaveManagementNeedRecordDetail",
    },
    {
      path: Routes.HQ_EMPLOYEE,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Employees.vue"
        ),
      name: "Employees",
    },
    {
      path: Routes.HQ_EMPLOYEE_VIEW,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Employee/EmployeeDetail.vue"
        ),
      name: "HQ_EMPLOYEE_VIEW",
    },
    {
      path: Routes.HQ_EMPLOYEE_FORM+ "/:id",
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Employee/EmployeeForm.vue"
        ),
      name: "HQ_EMPLOYEE_FORM",
    },
    {
      path: Routes.HQ_ENQUIRES,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Enquires.vue"
        ),
      name: "Enquires",
    },
    {
      path: Routes.HQ_ENQUIRES_PROSPECT_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Enquiry/EnquiryProspectForm.vue"
        ),
      name: "EnquiryProspectForm",
    },
    {
      path: Routes.HQ_ENQUIRES_PROSPECT_DETAIL+'/:id',
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Enquiry/EnquiryProspectDetail.vue"
        ),
      name: "EnquiryProspectDetail",
    },
    {
      path: Routes.HQ_ENQUIRES_STUDENT_FORM,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Enquiry/EnquiryStudentForm.vue"
        ),
      name: "EnquiryStudentForm",
    },
    {
      path: Routes.HQ_ENQUIRES_STUDENT_DETAIL+'/:id',
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Enquiry/EnquiryStudentDetail.vue"
        ),
      name: "EnquiryStudentDetail",
    },
    {
      path: Routes.HQ_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "Headquater" */
          "@/views/admin/hq/Settings.vue"
        ),
      name: "Settings",
    },
  ],
};
