<template>
  <Menubar>
    <template #start>
      <div class="p-d-flex">
        <h2 class="p-m-0">OnlineShop |</h2>
        <router-link to="/" v-slot="{ navigate }">
          <Button label="Магазин" class="p-button-secondary p-button-text" @click="navigate"/>
        </router-link>
      </div>
    </template>
    <template #end>
      <router-link to="/cart"
        ><i
          class="pi pi-shopping-cart p-mr-4 p-text-secondary"
          style="font-size: 1.9rem"
          v-badge="$store.getters['cart/quantityProductsInCart']"
          to="/cart"
        ></i
      ></router-link>
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";
import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
export default {
  data() {
    return {
      items: [
        {
          label: "Категории",
          icon: ""
        }
      ]
    };
  },
  directives: {
    badge: BadgeDirective
  },
  components: { Menubar, Button }
};
</script>

<style scoped>
.p-menubar {
  border: 0 !important;
  margin: 0 -8px;
  padding: 0.7rem !important;
}
</style>
