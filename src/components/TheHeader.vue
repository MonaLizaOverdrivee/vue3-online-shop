<template>
  <Menubar :model="items" style="z-index: 999">
    <template #start>
      <h2 class="p-mt-0 p-mb-1" v-text="title"></h2>
      <!-- <Button
            label="Магазин"
            class="p-button-secondary p-button-text"
            @click="$router.push('/')"
          /> -->
    </template>
    <template #end>
      <Button label="Войти" class="p-button-secondary p-button-text" icon="pi pi-sign-in" @click="$router.push('/auth')"/>
      <router-link to="/cart"
        ><i
          class="pi pi-shopping-cart p-mr-4 p-text-secondary"
          style="font-size: 1.9rem"
          v-badge="`${$store.getters['cart/quantityProductsInCart']}`"
          to="/cart"
          v-if="$route.meta.layout === 'main'"
        ></i
      ></router-link>
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import BadgeDirective from "primevue/badgedirective";
// import Button from "primevue/button";
export default {
  data() {
    return {
      items: [
        {
          label: "Магазин",
          to: "/",
        },
        {
          label: "Менеджер товаров",
          icon: "pi pi-sliders-h",
          to: "/admin/product",
          visible: () => this.$route.meta.layout === "admin"
        },
        {
          label: "Редактор категории",
          icon: "pi pi-tags",
          to: "/admin/categories",
          visible: () => this.$route.meta.layout === "admin"
        }
      ]
    };
  },
  computed: {
    title() {
      return this.$route.meta.layout !== "admin"
        ? "OnlineShop |"
        : "Панель управления |";
    }
  },
  directives: {
    badge: BadgeDirective
  },
  components: { Menubar, Button }
};
</script>

<style scoped>
.p-menubar {
  position: sticky;
  top: 0;
  border: 0 !important;
  margin: 0 -8px;
  padding: 0.7rem !important;
  box-shadow: 0px 3px 4px -1px;
}
</style>
