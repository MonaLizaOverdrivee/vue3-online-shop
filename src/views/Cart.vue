<template>
  <AppPage>
    <div class="p-grid">
      <div class="p-col-8 p-d-flex p-flex-column">
        <div class="p-col">
          <h2 class="p-m-0">Товары</h2>
          <h3 class="p-text-center" v-if="!products.length">
            В корзину ещё ничего не добавлено
          </h3>
        </div>

        <ProductList
          v-for="product in products"
          :key="product.id"
          :data="product"
        />
      </div>

      <div class="p-col p-d-flex p-flex-column p-as-start">
        <div class="p-col">
          <h2 class="p-m-0">Итого</h2>
        </div>
        <div class="p-col">
          <div class="p-d-flex p-jc-between p-mb-3">
            <div>Цена товаров:</div>
            <div>{{ totalProductsPrice }} РУБ</div>
          </div>
          <div class="p-d-flex p-jc-between p-mb-3">
            <div>Доставка:</div>
            <div>0,00 РУБ</div>
          </div>
          <hr />
        </div>
        <div class="p-col">
          <div class="p-d-flex p-jc-between p-mb-3">
            <div><strong>Итог:</strong></div>
            <div>{{ totalProductsPrice }} РУБ</div>
          </div>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script>
import AppPage from "../components/ui/AppPage";
import ProductList from "../components/ui/ProductList";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

export default {
  setup() {
    onMounted(() => store.dispatch("cart/getProductsForCart"));
    const store = useStore();
    const products = computed(() => store.getters["cart/products"]);
    const totalProductsPrice = computed(() =>
      products.value.reduce((acc, itm) => {
        acc += itm.price * itm.quantity;
        return acc;
      }, 0)
    );
    return {
      products,
      totalProductsPrice
    };
  },
  components: { AppPage, ProductList }
};
</script>
