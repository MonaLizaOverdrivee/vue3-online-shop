<template>
  <Menubar :model="items">
    <template #start>
      <h2 class="p-mt-0 p-mb-1" v-text="title"></h2>
      <!-- <Button
            label="Магазин"
            class="p-button-secondary p-button-text"
            @click="$router.push('/')"
          /> -->
    </template>
    <template #end>
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
import BadgeDirective from "primevue/badgedirective";
// import Button from "primevue/button";
export default {
  data() {
    return {
      items: [
        {
          label: "Магазин",
          icon: "",
          to: "/",
          visible: () => this.$route.meta.layout === "main"
        },
        {
          label: "Менеджер",
          icon: "",
          to: "/admin/product",
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
  components: { Menubar }
};
</script>

<style scoped>
.p-menubar >>> .p-menuitem-link {
  padding: 1rem !important;
}
.p-menubar {
  border: 0 !important;
  margin: 0 -8px;
  padding: 0.7rem !important;
  box-shadow: 0px 3px 4px -1px;
}
.p-button {
  font-weight: 600;
}
</style>
