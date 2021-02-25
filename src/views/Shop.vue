<template>
  <AppPage>
    <div class="p-grid">
      <div class="p-col-2">
        <div class="container-filter">
          <ShopFilter />
        </div>
      </div>
      <div class="p-col">
        <ShopView :products="products" />
      </div>
    </div>
  </AppPage>
</template>

<script>
import AppPage from "../components/ui/AppPage";
import ShopView from "../components/shop/ShopView";
import ShopFilter from "../components/shop/ShopFilter";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    const route = useRoute();
    const queryParam = computed(() => route.query);
    const store = useStore();
    const products = computed(() =>
      store.getters["shop/products"]
        .filter(itm =>
          queryParam.value.search
            ? itm.title
                .toLowerCase()
                .includes(queryParam.value.search.toLowerCase())
            : true
        )
        .filter(itm =>
          queryParam.value.category
            ? itm.category === queryParam.value.category
            : true
        )
        .sort((prev, next) => next.count - prev.count)
    );
    return {
      products
    };
  },
  components: { AppPage, ShopFilter, ShopView }
};
</script>

<style scoped>
.container-filter {
  position: sticky;
  top: 5rem;
}
</style>
