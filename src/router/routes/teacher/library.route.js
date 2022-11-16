import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/library.menus";
export default {
  path: Routes.LI_BASE,
  name: "library",
  meta: { layout: AppLayout.Home, permission: "teacher" },
  component: () =>
    import(/* webpackChunkName: "library" */ "@/views/teacher/library/index.vue"),
  children: [
    {
      path: Routes.LI_DASHBOARD,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/Dashboard.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.LI_CATALOG,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/BookCatalog.vue"
        ),
      name: "LI_CATALOG",
    },
    {
      path: Routes.LI_ADD_CATALOG,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/bookCatalog/addBook.vue"
        ),
      name: "LI_CATALOG",
    },
    {
      path: Routes.LI_EDIT_CATALOG,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/bookCatalog/editBook.vue"
        ),
      name: "LI_CATALOG",
    },
    {
      path: Routes.LI_SCAN_CATALOG,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/bookCatalog/scanToSearch.vue"
        ),
      name: "LI_CATALOG",
    },
    {
      path: Routes.LI_ISSUE_RETURN,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/IssueReturnBook.vue"
        ),
      name: "IssueReturnBook",
    },
    {
      path: Routes.LI_ISSUE_DETAIL,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/issueReturn/detail.vue"
        ),
      name: "details",
    },
    {
      path: Routes.LI_ISSUE_VIEW_DETAIL,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/issueReturn/detailIssue.vue"
        ),
      name: "details",
    },
    {

      path: Routes.LI_RETURN_BOOK,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/returnBook.vue"
        ),
      name: "IssueReturnBook",
    },
    {
      path: Routes.LI_SCAN_TO_SEARCH,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/scanToSearch.vue"
        ),
      name: "IssueReturnBook",
    },
    {
      path: Routes.LI_RESERVED,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/ReservedBooks.vue"
        ),
      name: "ReservedBooks",
    },
    {
      path: Routes.LI_BOOKMARKED,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/BookmarkedBooks.vue"
        ),
      name: "LI_BOOKMARKED",
    },
    {
      path: Routes.LI_INVENTORY,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/Inventory.vue"
        ),
      name: "LI_INVENTORY",
    },

    {
      path: Routes.LI_TASK,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/Task.vue"
        ),
      name: "LI_TASK",
    },
    {
      path: Routes.LI_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "library" */
          "@/views/teacher/library/Settings.vue"
        ),
      name: "Settings",
    },
  ],
};
