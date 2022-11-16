import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/knowledge.menus";
export default {
  path: Routes.KN_BASE,
  name: "Knowledge",
  meta: { layout: AppLayout.Home, permission: "admin" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/admin/knowledge/index.vue"),
  children: [
    {
      path: Routes.KN_OVERVIEW,
      component: () =>
        import(
          /* webpackChunkName: "school" */
          "@/views/admin/knowledge/Overview.vue"
        ),
      name: "KN_OVERVIEW",
    },
    {
      path: Routes.KN_QUERY +'/standard/:standard_id/subject/:subject_id',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/knowledge/queries.vue"
        ),
      name: "KN_QUERY",
    },
    {
      path: Routes.KN_QUERY_DETAIL + '/:queryId',
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/knowledge/queriesDetail.vue"
        ),
      name: "Details",
    },
    {
      path: Routes.KN_TAGS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/knowledge/tags.vue"
        ),
      name: "Tags",
    },
    {
      path: Routes.KN_FAVORITE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/admin/knowledge/favorite.vue"
        ),
      name: "Favourites",
    },
    
   
    
  ],
};
