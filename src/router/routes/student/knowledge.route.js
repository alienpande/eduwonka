import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/knowledge.menus";
export default {
  path: Routes.KN_BASE,
  name: "Knowledge",
  meta: { layout: AppLayout.Home, permission: "student" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/student/knowledge/index.vue"),
  children: [
    {
      path: Routes.KN_OVERVIEW,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/student/knowledge/Overview.vue"
        ),
      name: "KN_OVERVIEW",
    },
    {
      path: Routes.KN_QUERY +'/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/knowledge/queries.vue"
        ),
      name: "KN_QUERY",
    },
    {
      path: Routes.KN_QUERY_DETAIL+ '/:query_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/knowledge/queriesDetail.vue"
        ),
      name: "Details",
    },
    {
      path: Routes.KN_TAGS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/knowledge/tags.vue"
        ),
      name: "Tags",
    },
    {
      path: Routes.KN_FAVORITE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/student/knowledge/favorite.vue"
        ),
      name: "Favourites",
    },
  ],
};
