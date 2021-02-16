import { createRouter, createWebHistory } from "vue-router";
import store from '../store'

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
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
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
  const validRole = store.getters['auth/checkValidRole']
  const userRole = store.getters['auth/userRole']
  const acsess = validRole && (userRole === 'admin')
  console.log(validRole, userRole, acsess)
  if(acsess && to.meta.layout === 'admin'){
    next()
  }else if(to.meta.layout === 'main' || to.meta.layout === 'auth'){
    next()
  }else {
    next('/auth')
  }
})

export default router;
