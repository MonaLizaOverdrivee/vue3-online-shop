import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: '/',
    component: () => import('../views/Home'),
    meta: {
      layout: 'main',
      title: 'Главная'
    }
  },
  {
    path: "/shop",
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
    path: "/singup",
    name: "SingUp",
    component: () => import("../views/SingUp.vue"),
    meta: {
      layout: "auth"
    }
  },
  {
    path: "/singnupdone",
    name: "Singnupdone",
    component: () => import("../views/SingnUpDone.vue"),
    meta: {
      layout: "auth"
    }
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      layout: "main",
      title: "Личный кабинет"
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
      },
      {
        path: "orders",
        name: "Orders",
        meta: {
          layout: "admin",
          title: "Заказы"
        },
        component: () => import("../views/admin/AdminOrders")
      }
    ]
  },
  {
    path: "/:notFound(.*)",
    name: "NotFound",
    meta: {
      layout: 'main'
    },
    component: () => import("../views/PageNotFound")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  // const validRole = store.getters["auth/checkValidRole"];
  const userRole = store.getters["auth/userRole"];
  const acsess = userRole === "admin";

  if (acsess && to.meta.layout === "admin") {
    next();
  } else if (!acsess && to.meta.layout === "admin") {
    next("/auth");
  } else {
    next();
  }
});

export default router;
