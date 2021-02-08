import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Магазин",
    component: () => import("../views/Shop.vue"),
    meta: {
      layout: "main"
    }
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../views/Product.vue"),
    meta: {
      layout: "main"
    }
  },
  {
    path: "/cart",
    name: "Корзина",
    component: () => import("../views/Cart.vue"),
    meta: {
      layout: "main"
    }
  },

  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
    meta: {
      layout: "auth"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
});

export default router;
