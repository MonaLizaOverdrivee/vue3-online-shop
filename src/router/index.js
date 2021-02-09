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
    props: true,
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
  },
  {
    path: "/admin",
    name: "Панель управления",
    component: () => import("../views/admin/Admin"),
    meta: { layout: "admin" },
    children: [
      {
        path: "product",
        name: "Менеджер продуктов",
        component: () => import("../views/admin/AdminProduct")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
});

export default router;
