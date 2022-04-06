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
    path: "/my-page",
    name: "Mypage",
    component: () => import("./views/MyPage.vue"),
  },
  {
    path: "/sign-in",
    component: () => import("./views/SignIn.vue"),
  },
  {
      path: "/register",
      component: () => import("./views/Register.vue"),
  },
  {
    path: "/my-chat",
    component: () => import("./views/ChatList.vue"),
  },
  {
    path: "/my-chat/:id",
    name: "ChatRoom",
    props: true,
    component: () => import("./views/Chat.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;