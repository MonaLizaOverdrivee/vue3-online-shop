<template>
  <component :is="layout + '-layout'" />
  <ScrollTop class="custom-scrolltop"/>
</template>

<script>
import ScrollTop from 'primevue/scrolltop';
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import AuthLayout from "./lauout/AuthLayout";
import MainLayout from "./lauout/MainLayout";
import AdminLayout from "./lauout/AdminLayout";
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore()
    const route = useRoute();
    const layout = computed(() => route.meta.layout);
    onMounted(() =>{
      store.dispatch('cart/getProductsForCart')
      // store.dispatch('auth/autoLogin')
      })
    return { layout };
  },
  components: { AuthLayout, MainLayout, AdminLayout, ScrollTop }
};
</script>
<style>
.custom-scrolltop {
  background-color: var(--primary-color) !important;
}
.p-button:focus {
  box-shadow: none !important;
}
body {
  margin-top: 0;
}
#app {
  font-family: var(--font-family);
}
</style>
