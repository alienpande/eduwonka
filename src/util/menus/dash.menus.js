import { MAIN } from "./main.menus";

export const MenuTitle = {
    Dashboard: { title: "Dashbaord", icon: "main/dashboard" },
    Finance: { title: "Finance", icon: "main/finance" },
    School: { title: "School", icon: "main/school" },
    DigitalLibrary: { title: "Digital Library", icon: "main/digital-library" },
    Learn: { title: "Learn", icon: "main/learn" },
    HQ: { title: "Information Hub", icon: "main/hq" },
    Library: { title: "Library", icon: "main/library" },
    Connect: { title: "Connect", icon: "main/connect" },
    Knowledge: { title: "Knowledge", icon: "main/knowledge" },
  };
  

export const Routes = {
    SCHOOL: "/school",
    DIGITAL_LIBRARY: "/digital-library",
    FINANCE: "/finance",
    LEARN: "/learn",
    HQ: "/hq",
    LIBRARY: "/library",
    HOME: "/",
    CONNECT: "/connect",
    KNOWLEDGE: "/knowledge",
    WILD: "*",
  };
  
  //#region Top Main Menu
  export const MainHeadQuater = [
    {
      id: 6,
      title: MenuTitle.Dashboard.title,
      to: MAIN.HOME,
      icon: MenuTitle.Dashboard.icon,
    },
    {
      id: 5,
      title: MenuTitle.HQ.title,
      to: `${MAIN.HQ}/dashboard`,
      icon: MenuTitle.HQ.icon,
    },
    {
      id: 4,
      title: MenuTitle.Learn.title,
      to: `${MAIN.LEARN}/dashbaord`,
      icon: MenuTitle.Learn.icon,
    },
    {
      id: 3,
      title: MenuTitle.School.title,
      to: `${MAIN.SCHOOL}/overview`,
      icon: MenuTitle.School.icon,
    },
  
    {
      id: 14,
      title: MenuTitle.Library.title,
      to: `${MAIN.LIBRARY}/dashboard`,
      icon: MenuTitle.Library.icon,
    },
    {
      id: 1,
      title: MenuTitle.Finance.title,
      to: `${MAIN.FINANCE}/dashbaord`,
      icon: MenuTitle.Finance.icon,
    },
    {
      id: 16,
      title: MenuTitle.Connect.title,
      to: `${MAIN.CONNECT}/dashbaord`,
      icon: MenuTitle.Connect.icon,
    },
    {
      id: 17,
      title: MenuTitle.Knowledge.title,
      to: `${MAIN.KNOWLEDGE}/queries`,
      icon: MenuTitle.Knowledge.icon,
    },
    {
      id: 12,
      title: MenuTitle.DigitalLibrary.title,
      to: `${MAIN.DIGITAL_LIBRARY}/all-files`,
      icon: MenuTitle.DigitalLibrary.icon,
    },
  ];
