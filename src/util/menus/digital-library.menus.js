import { MAIN } from "./main.menus";
export const Routes = {
  DL_BASE: MAIN.DIGITAL_LIBRARY,
  DL_ALL_FILES: MAIN.DIGITAL_LIBRARY + "/all-files",
  DL_SHARED_WITH_ME: MAIN.DIGITAL_LIBRARY + "/shared-with-me",
  DL_RECENT: MAIN.DIGITAL_LIBRARY + "/recent",
  DL_BOOKMARKED: MAIN.DIGITAL_LIBRARY + "/bookmarked",
  DL_DELETED_FILES: MAIN.DIGITAL_LIBRARY + "/deleted-files",
  DL_SETTINGS: MAIN.DIGITAL_LIBRARY + "/settings",
  DL_SHEARE_FILE:MAIN.DIGITAL_LIBRARY + "/sheare-file",
  DL_OPEN_FOLDER:MAIN.DIGITAL_LIBRARY + "/open-folder",
  DL_SHEARE_FOLDER:MAIN.DIGITAL_LIBRARY + "/sheare-folder",
};

//#region Digital Library Menu
export const DigitalLibrary = [
  {
    id: 1,
    title: "All Files",
    to: Routes.DL_ALL_FILES,
    icon: "digital/data-server",
  },
  {
    id: 2,
    title: "Shared with me",
    to: Routes.DL_SHARED_WITH_ME,
    icon: "digital/shared",
  },
  {
    id: 3,
    title: "Recent",
    to: Routes.DL_RECENT,
    icon: "digital/recent",
  },
  {
    id: 4,
    title: "Bookmarked",
    to: Routes.DL_BOOKMARKED,
    icon: "digital/bookmark",
  },
  {
    id: 5,
    title: "Deleted Files",
    to: Routes.DL_DELETED_FILES,
    icon: "digital/deleted",
  },

  {
    id: 6,
    title: "Settings",
    to: "",
    ficon: "settings",
    css: "bottom-menu-item",
    routes: [
      {
        id: 22,
        title: "DL Setttings 1",
        to: Routes.DL_SETTINGS,
      },
      {
        id: 23,
        title: "DL Setttings 2",
        to: Routes.DL_SETTINGS,
      },
      {
        id: 24,
        title: "DL Setttings 3",
        to: Routes.DL_SETTINGS,
      },
    ],
  },
];
//#endregion
