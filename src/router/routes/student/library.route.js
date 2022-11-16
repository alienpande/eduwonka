import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/library.menus";
export default {
  path: Routes.LI_BASE,
  name: "library",
  meta: { layout: AppLayout.Home, permission: "student" },
  component: () =>
    import(/* webpackChunkName: "library" */ "@/views/student/library/index.vue"),
  children: [
    {
      path: Routes.LI_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.LI_CATALOG,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/BookCatalog.vue"
        ),
      name: "LI_CATALOG",
    },
    {
      path: Routes.LI_ADD_CATALOG,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/bookCatalog/addBook.vue"
        ),
      name: "LI_CATALOG",
    },
    {
      path: Routes.LI_EDIT_CATALOG + "/:id",
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/bookCatalog/editBook.vue"
        ),
      name: "LI_CATALOG",
    },
    {
      path: Routes.LI_SCAN_CATALOG,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/bookCatalog/scanToSearch.vue"
        ),
      name: "LI_CATALOG",
    },
    {
      path: Routes.LI_ISSUE_RETURN,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/IssueReturnBook.vue"
        ),
      name: "IssueReturnBook",
    },
    {
      path: Routes.LI_ISSUE_DETAIL,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/issueReturn/detail.vue"
        ),
      name: "details",
    },
    {
      path: Routes.LI_ISSUE_VIEW_DETAIL+"/:id",
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/issueReturn/detailIssue.vue"
        ),
      name: "details",
    },
    {

      path: Routes.LI_RETURN_BOOK,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/returnBook.vue"
        ),
      name: "IssueReturnBook",
    },
    {
      path: Routes.LI_SCAN_TO_SEARCH,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/scanToSearch.vue"
        ),
      name: "IssueReturnBook",
    },
    {
      path: Routes.LI_RESERVED,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/ReservedBooks.vue"
        ),
      name: "ReservedBooks",
    },
    {
      path: Routes.LI_BOOKMARKED,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/BookmarkedBooks.vue"
        ),
      name: "LI_BOOKMARKED",
    },
    {
      path: Routes.LI_INVENTORY,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/Inventory.vue"
        ),
      name: "LI_INVENTORY",
    },

    {
      path: Routes.LI_TASK,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/Task.vue"
        ),
      name: "LI_TASK",
    },
    {
      path: Routes.LI_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/student/library/Settings.vue"
        ),
      name: "Settings",
    },
  ],
};
