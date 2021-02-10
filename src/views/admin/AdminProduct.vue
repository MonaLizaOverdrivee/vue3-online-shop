<template>
  <AppPage>
    <ProductTable :data="products" />
  </AppPage>
</template>

<script>
import AppPage from "../../components/ui/AppPage";
import ProductTable from "../../components/admin/product/ProductTable";
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
  components: { AppPage, ProductTable }
};
</script>

<style></style>
