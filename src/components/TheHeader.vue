<template>
  <Menubar :model="items" style="z-index: 999">
    <template #start>
      <h2 class="header__logo" @click="$router.push('/')">OnlineShop |</h2>
    </template>
    <pre>{{ auth }}</pre>
    <template #end>
      <Button
        :label="$store.getters['auth/userName']"
        class="p-button-secondary p-button-text"
        v-if="auth"
        @click="$router.push('/user')"
      />
      <Button
        label="Выход"
        class="p-button-secondary p-button-text"
        icon="pi pi-sign-out"
        @click="logOut"
        v-if="auth"
      />
      <Button
        label="Войти"
        class="p-button-secondary p-button-text"
        icon="pi pi-sign-in"
        @click="$store.commit('TOGGLE_VISIBLE')"
        v-else
      />
      <router-link to="/cart"
        ><i
          class="pi pi-shopping-cart p-mr-4 p-text-secondary"
          style="font-size: 1.9rem"
          v-badge="`${$store.getters['cart/quantityProductsInCart']}`"
          to="/cart"
        ></i
      ></router-link>
    </template>
  </Menubar>
  <Dialog
    header=" "
    dismissableMask
    v-model:visible="$store.state['visibleAuthModal']"
    :style="{ width: '450px' }"
    :modal="true"
    class="p-fluid"
  >
    <Auth />
  </Dialog>
</template>

<script>
import Auth from "../views/Auth";
import Dialog from "primevue/dialog";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import BadgeDirective from "primevue/badgedirective";
// import Button from "primevue/button";
export default {
  data() {
    return {
      visibility: false,
      // modalQustions: false,
      items: [
        {
          label: "Магазин",
          to: "/shop"
        }
      ]
    };
  },
  computed: {
    auth() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logOut");
      this.$router.push("/");
    }
  },
  directives: {
    badge: BadgeDirective
  },
  components: { Menubar, Button, Dialog, Auth }
};
</script>

<style scoped>
.p-menubar {
  position: sticky;
  top: 0;
  border: 0 !important;
  padding: 0.7rem !important;
  box-shadow: 0px 3px 4px -1px;
}
.header__logo {
  margin: 0 0 0.25rem;
  cursor: pointer;
}
</style>
