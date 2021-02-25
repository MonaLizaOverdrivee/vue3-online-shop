<template>
  <component :is="layout + '-layout'" />
  <ScrollTop class="custom-scrolltop" />
</template>

<script>
import ScrollTop from "primevue/scrolltop";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import AuthLayout from "./lauout/AuthLayout";
import MainLayout from "./lauout/MainLayout";
import AdminLayout from "./lauout/AdminLayout";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const layout = computed(() => route.meta.layout);
    onMounted(async () => {
      await store.dispatch("getAppData");
    });
    return { layout };
  },
  components: { AuthLayout, MainLayout, AdminLayout, ScrollTop }
};
</script>
<style></style>
