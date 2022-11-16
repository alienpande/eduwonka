import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/digital-library.menus";

export default {
  path: Routes.DL_BASE,
  name: "digitalLibrary",
  meta: { layout: AppLayout.Home, permission: "teacher" },
  component: () =>
    import(
      /* webpackChunkName: "digitalLibrary" */
      "@/views/teacher/digital-library/index.vue"
    ),
  children: [
    {
      path: Routes.DL_ALL_FILES,
      component: () =>
        import(
          /* webpackChunkName: "digitalLibrary" */
          "@/views/teacher/digital-library/AllFiles.vue"
        ),
      name: "AllFiles",
    },
    {
      path: Routes.DL_SHARED_WITH_ME,
      component: () =>
        import(
          /* webpackChunkName: "digitalLibrary" */
          "@/views/teacher/digital-library/SharedWithMe.vue"
        ),
      name: "SharedWithMe",
    },
    {
      path: Routes.DL_RECENT,
      component: () =>
        import(
          /* webpackChunkName: "digitalLibrary" */
          "@/views/teacher/digital-library/Recent.vue"
        ),
      name: "Recent",
    },
    {
      path: Routes.DL_BOOKMARKED,
      component: () =>
        import(
          /* webpackChunkName: "digitalLibrary" */
          "@/views/teacher/digital-library/Bookmarked.vue"
        ),
      name: "Bookmarked",
    },
    {
      path: Routes.DL_DELETED_FILES,
      component: () =>
        import(
          /* webpackChunkName: "digitalLibrary" */
          "@/views/teacher/digital-library/DeletedFiles.vue"
        ),
      name: "DeletedFiles",
    },
    {
      path: Routes.DL_SETTINGS,
      component: () =>
        import(
          /* webpackChunkName: "digitalLibrary" */
          "@/views/teacher/digital-library/Settings.vue"
        ),
      name: "Settings",
    },
    {
      path: Routes.DL_SHEARE_FILE,
      component: () =>
        import(
          /* webpackChunkName: "digitalLibrary" */
          "@/views/teacher/digital-library/sheareFile.vue"
        ),
      name: "Settings",
    },
  ],
};
