import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("./views/Test.vue"),
  },
  {
    path: "/sign-in",
    component: () => import("./views/SignIn.vue"),
  },
  {
      path: "/register",
      component: () => import("./views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;