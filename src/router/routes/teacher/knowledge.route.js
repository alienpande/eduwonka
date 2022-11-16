import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/knowledge.menus";
export default {
  path: Routes.KN_BASE,
  name: "Knowledge",
  meta: { layout: AppLayout.Home, permission: "teacher" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/teacher/knowledge/index.vue"),
  children: [
    {
      path: Routes.KN_QUERY,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/knowledge/queries.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.KN_QUERY_DETAIL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/knowledge/queriesDetail.vue"
        ),
      name: "Details",
    },
    {
      path: Routes.KN_TAGS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/knowledge/tags.vue"
        ),
      name: "Details",
    },
    {
      path: Routes.KN_FAVORITE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/teacher/knowledge/favorite.vue"
        ),
      name: "Details",
    },
    
   
    
  ],
};
