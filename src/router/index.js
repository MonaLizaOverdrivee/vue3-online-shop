import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Shop",
    component: () => import("../views/Shop.vue"),
    meta: {
      layout: "main",
      title: "Магазин"
    }
  },
  {
    path: "/product/:id",
    name: "Product",
    props: true,
    component: () => import("../views/Product.vue"),
    meta: {
      layout: "main",
      title: "Продуты"
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      layout: "main",
      title: "Корзина"
    }
  },

  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
    meta: {
      layout: "auth",
      title: "Вход"
    }
  },
  {
    path: "/admin",
    name: "Dashboard",
    redirect: "/admin/product",
    component: () => import("../views/admin/Admin"),
    meta: { layout: "admin", title: "Панель управления" },
    children: [
      {
        path: "product",
        name: "AdminProduct",
        meta: {
          layout: "admin",
          title: "Менеджер товаров"
        },
        component: () => import("../views/admin/AdminProduct")
      },
      {
        path: "categories",
        name: "Categories",
        meta: {
          layout: "admin",
          title: "Редактор категории"
        },
        component: () => import("../views/admin/AdminCategories")
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
