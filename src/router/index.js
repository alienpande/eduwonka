import Vue from "vue";
import NProgress from "nprogress";
import "@/assets/css/nprogress.css";
import VueRouter from "vue-router";
import { getToken } from "@/util/auth";

import admin from "@/router/routes/admin/index";
import parent from "@/router/routes/parent/index";
import student from "@/router/routes/student/index";
import teacher from "@/router/routes/teacher/index";

import store from "../store/index";
import {getId} from "@/util/auth"

Vue.use(VueRouter);
let routes = [];
import publicRoutes from "./routes/public.route";
routes = routes.concat(publicRoutes);

let permissionRoutes = { admin, parent, student, teacher };


/* eslint-disable */
// import home from "./routes/home";
// routes.push(home);

function beforeRouteResolve(to, from, next) {
  console.log('before route checking', getId());
    // If this isn"t an initial page load.
    if (to.name && to.hash === "") {
        NProgress.start();
    }
    next();
}

function afterEachRoute(to, from) {
    NProgress.done();
}

function guardMyroute(to, from, next) {
    try {
        if (to.path == "/signin" || to.path == "/signup") {
            next();
        } else if(!getToken()) {
            console.log(getToken())
            throw "err";
        } else {
            console.log(getToken())
            next();
        }
      } catch (err) {
        next("/signin")
      }
}

const createRouter = () =>  new VueRouter({
    //mode: "history",
    base: process.env.BASE_URL,
    routes,
    afterEachRoute: afterEachRoute,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
});

const router = createRouter();

let role = store.state.User.roles;
if (role.length) {
    router.addRoutes(permissionRoutes[role.toString()]);
}

export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

router.beforeEach(guardMyroute);
router.beforeResolve(beforeRouteResolve);
router.afterEach(afterEachRoute);
Vue.prototype.$go = (url, data = null) => {
    let u = url;
    if (data != null) {
        Object.keys(data).forEach((key) => {
            const val = data[key];
            u = u.replace(":" + key, val);
        });
    }
    router.push(u);
};
export default router;
