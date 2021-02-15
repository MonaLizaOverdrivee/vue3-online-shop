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
      <Button :label="$store.getters['auth/userName']" class="p-button-secondary p-button-text" v-if="auth"/>
      <Button label="Выход" class="p-button-secondary p-button-text" icon="pi pi-sign-out" @click="logOut" v-if="auth"/>
      <Button label="Войти" class="p-button-secondary p-button-text" icon="pi pi-sign-in" @click="$router.push('/auth')" v-else/>
      <router-link to="/cart"
        ><i
          class="pi pi-shopping-cart p-mr-4 p-text-secondary"
          style="font-size: 1.9rem"
          v-badge="`${$store.getters['cart/quantityProductsInCart']}`"
          to="/cart"
          v-if="!auth"
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
          to: "/"
        },
        {
          label: "Менеджер товаров",
          icon: "pi pi-sliders-h",
          to: "/admin/product",
          visible: () => this.auth
        },
        {
          label: "Редактор категории",
          icon: "pi pi-tags",
          to: "/admin/categories",
          visible: () => this.auth
        }
      ]
    };
  },
  computed: {
    auth(){
      return this.$store.getters['auth/userRole'] === 'admin'
    },
    title() {
      return !this.auth
        ? "OnlineShop |"
        : "Панель управления |";
    },
  },
  methods: {
      logOut(){
        this.$store.dispatch('auth/logOut')
        this.$router.push('/')
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
