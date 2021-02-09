<template>
  <div class="p-pr-2 p-pl-2">
    <Toolbar>
      <template #right>
        <Button
          icon="pi pi-th-large"
          :class="['grid', { 'p-button-outlined': layout === 'list' }]"
          @click="layout = 'grid'"
        />
        <Button
          icon="pi pi-bars"
          :class="['list', { 'p-button-outlined': layout === 'grid' }]"
          @click="layout = 'list'"
        />
      </template>
    </Toolbar>
  </div>
  <div class="p-grid">
    <component
      :is="'product-' + layout"
      v-for="product in products"
      :key="product.id"
      :data="product"
    />
  </div>
</template>

<script>
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import ProductGrid from "../ui/ProductGrid";
import ProductList from "../ui/ProductList";
import { computed, ref } from "vue";

export default {
  props: ["data"],
  setup(props) {
    const layout = ref("grid");
    return {
      products: computed(() => props.data),
      layout
    };
  },
  components: { ProductGrid, ProductList, Toolbar, Button }
};
</script>

<style scoped>
.p-button.grid {
  border-radius: 3px 0 0 3px;
}
.p-button.list {
  border-radius: 0 3px 3px 0;
}
</style>
