<template>
  <component :is="layout + '-layout'" />
</template>

<script>
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
  components: { AuthLayout, MainLayout, AdminLayout }
};
</script>
<style>
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
