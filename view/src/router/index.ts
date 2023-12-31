import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiredAuth: false },
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { requiredAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: { requiredAuth: false },
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("../views/ForgetPassword.vue"),
    meta: { requiredAuth: false },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/error/404.vue"),
    meta: { requiredAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiredAuth && !isAuthorization()) {
    return { name: "login", query: { return: to.path } };
  }
  return true;
});

function isAuthorization() {
  let USER = localStorage.getItem("EinziegCloud_USER");
  return !!USER;
}

export default router;
