<template>
  <component :is="layout + '-layout'" />
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import AuthLayout from "./lauout/AuthLayout";
import MainLayout from "./lauout/MainLayout";
export default {
  setup() {
    const route = useRoute();
    const layout = computed(() => route.meta.layout);
    return { layout };
  },
  components: { AuthLayout, MainLayout }
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
