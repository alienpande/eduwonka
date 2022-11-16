import { MAIN } from "./main.menus";
export const Routes = {
  LI_BASE: MAIN.LIBRARY,
  LI_DASHBOARD: MAIN.LIBRARY + "/dashboard",
  LI_CATALOG: MAIN.LIBRARY + "/catalog",
  LI_ADD_CATALOG: MAIN.LIBRARY + "/add-catalog",
  LI_EDIT_CATALOG:MAIN.LIBRARY + "/edit-catalog",
  LI_SCAN_CATALOG:MAIN.LIBRARY + "/scan-catalog",
  LI_ISSUE_RETURN: MAIN.LIBRARY + "/issue-or-return",
  LI_ISSUE_DETAIL:MAIN.LIBRARY + "/fill-issue-detail",
  LI_ISSUE_VIEW_DETAIL:MAIN.LIBRARY + "/view-issue-detail",
  LI_SCAN_TO_SEARCH: MAIN.LIBRARY + "/scan-to-search",
  LI_RETURN_BOOK:MAIN.LIBRARY + "/return-book",
  LI_RESERVED: MAIN.LIBRARY + "/reserved",
  LI_BOOKMARKED: MAIN.LIBRARY + "/bookmarked",
  LI_INVENTORY: MAIN.LIBRARY + "/inventory",
  LI_TASK: MAIN.LIBRARY + "/task",
  LI_SETTINGS: MAIN.LIBRARY + "/settings",
  
};

//#region Library Menu
export const Library = [
  {
    id: 1,
    title: "Dashboard",
    to: Routes.LI_DASHBOARD,
    icon: "library/activity",
  },
  {
    id: 2,
    title: "Book Catalog",
    to: Routes.LI_CATALOG,
    icon: "library/bookcatalog",
  },
  {
    id: 3,
    title: "Issue/Return book",
    to: Routes.LI_ISSUE_RETURN,
    icon: "library/return",
  },
  {
    id: 4,
    title: "Reserved Books",
    to: Routes.LI_RESERVED,
    icon: "library/resevered",
  },
  {
    id: 5,
    title: "Bookmarked Books",
    to: Routes.LI_BOOKMARKED,
    icon: "library/bookmark",
  },
  {
    id: 6,
    title: "Inventory",
    to: Routes.LI_INVENTORY,
    icon: "library/inventory",
  },
  {
    id: 7,
    title: "Task",
    to: Routes.LI_TASK,
    icon: "library/task",
  },
  {
    id: 8,
    title: "Settings",
    to: Routes.LI_SETTINGS,
    icon: "settings",
    css: "bottom-menu-item as",
    // routes: [
    //   {
    //     id: 22,
    //     title: "HQ Setttings 1",
    //     to: Routes.LI_SETTINGS,
    //     icon: "library/book",
    //   },
    //   {
    //     id: 23,
    //     title: "HQ Setttings 2",
    //     to: Routes.LI_SETTINGS,
    //     icon: "library/sunrise",
    //   },
    //   {
    //     id: 24,
    //     title: "HQ Setttings 3",
    //     to: Routes.LI_SETTINGS,
    //     icon: "library/command",
    //   },
    // ],
  },
];
//#endregion
