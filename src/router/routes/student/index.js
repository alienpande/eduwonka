let routes = [];

/* eslint-disable */

// import onboarding from "./onboarding.route";
// routes = routes.concat(onboarding);

import finance from "./finance.route";
routes.push(finance);

import digitalLibrary from "./digital-library.route";
routes.push(digitalLibrary);

import hq from "./hq.route";
routes.push(hq);

import learn from "./learn.route";
routes.push(learn);

import connect from "./connect.route";
routes.push(connect);

import knowledge from "./knowledge.route";
routes.push(knowledge);

import library from "./library.route";
routes.push(library);

import school from "./school.route";
routes.push(school);

import home from "./home.route";
routes.push(home)

export default routes;