<template>
  <div class="p-pr-2 p-pl-2">
    <Toolbar>
      <template #right>
        <Button
          icon="pi pi-th-large"
          :class="['grid', { 'p-button-outlined': layout === 'List' }]"
          @click="toogleView"
        />
        <Button
          icon="pi pi-bars"
          :class="['list', { 'p-button-outlined': layout === 'Grid' }]"
          @click="toogleView"
        />
      </template>
    </Toolbar>
  </div>
  <div class="p-grid">
    <component
      :is="'ShopView' + layout"
      v-for="product in products"
      :key="product.id"
      :data="product"
    />
  </div>
</template>

<script>
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import ShopViewGrid from "../shop/ShopViewGrid";
import ShopViewList from "../shop/ShopViewList";
import {  ref } from "vue";

export default {
  props: ["products"],
  setup() {
    const layout = ref("Grid");
    function toogleView() {
      layout.value = layout.value === 'Grid' ? 'List' : 'Grid'
    }
    return {
      layout,
      toogleView
    };
  },
  components: { ShopViewGrid, ShopViewList, Toolbar, Button }
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
