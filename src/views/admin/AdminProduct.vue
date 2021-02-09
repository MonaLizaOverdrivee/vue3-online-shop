<template>
  <AppPage>
    <TheTable :data="products" />
  </AppPage>
</template>

<script>
import AppPage from "../../components/ui/AppPage";
import TheTable from "../../components/admin/product/TheTable";
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";
export default {
  setup() {
    const store = useStore();
    onBeforeMount(() => store.dispatch("shop/getAllProducts"));
    return {
      products: computed(() => store.getters["shop/products"])
    };
  },
  components: { AppPage, TheTable }
};
</script>

<style></style>
