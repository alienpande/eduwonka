import { MAIN } from "./main.menus";
export const Routes = {
  KN_BASE: MAIN.KNOWLEDGE,
  KN_OVERVIEW: MAIN.KNOWLEDGE + "/overview",
  KN_QUERY: MAIN.KNOWLEDGE + "/queries",
  KN_TAGS: MAIN.KNOWLEDGE + "/tags",
  KN_FAVORITE: MAIN.KNOWLEDGE + "/favourite",
  KN_QUERY_DETAIL: MAIN.KNOWLEDGE + "/queries-detail",
};

//#region Knowledge Menu
export const Knowledge = [
  {
    id: 1,
    title: "Dashboard",
    to: Routes.KN_OVERVIEW,
    icon: "school/overview",
  },
  {
    id: 2,
    title: "Queries",
    link: Routes.KN_QUERY,
    icon: "learn/Help",
    action: "EXAM_MENU",
    name: "KN_QUERY"
  },
  {
    id: 3,
    title: "Tags",
    to: Routes.KN_TAGS,
    icon: "tag",
  },
  {
    id: 4,
    title: "Favourites",
    to: Routes.KN_FAVORITE,
    icon: "heart",
  },
];
//#endregion
