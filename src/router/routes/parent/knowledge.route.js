import { AppLayout } from "@/util/contants";
import { Routes } from "@/util/menus/knowledge.menus";
export default {
  path: Routes.KN_BASE,
  name: "Knowledge",
  meta: { layout: AppLayout.Home, permission: "parent" },
  component: () =>
    import(/* webpackChunkName: "Learn" */ "@/views/parent/knowledge/index.vue"),
  children: [
    {
      path: Routes.KN_QUERY,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/knowledge/queries.vue"
        ),
      name: "Dashboard",
    },
    {
      path: Routes.KN_QUERY_DETAIL,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/knowledge/queriesDetail.vue"
        ),
      name: "Details",
    },
    {
      path: Routes.KN_TAGS,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/knowledge/tags.vue"
        ),
      name: "Details",
    },
    {
      path: Routes.KN_FAVORITE,
      component: () =>
        import(
          /* webpackChunkName: "Learn" */
          "@/views/parent/knowledge/favorite.vue"
        ),
      name: "Details",
    },
    
   
    
  ],
};
