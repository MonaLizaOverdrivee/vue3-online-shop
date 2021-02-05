<template>
  <AppPage>
    <div class="p-grid">
      <div class="p-col-8 p-d-flex p-flex-column">
        <div class="p-col"><h2 class="p-m-0">Товары</h2></div>
        <ProductList
          v-for="product in products"
          :key="product.id"
          :data="product"
          @priceProduct="asd"
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
            <div><strong>Цена товаров:</strong></div>
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
import { ref, computed } from "vue";

export default {
  setup() {
    const products = ref([
      {
        id: 1,
        image:
          "https://primefaces.org/primevue/showcase/demo/images/product/brown-purse.jpg",
        name: "Яблоки",
        description: "очень свежие зеленые яблоки",
        category: "fruit",
        price: 100,
        count: 1
      },
      {
        id: 4,
        image:
          "https://primefaces.org/primevue/showcase/demo/images/product/brown-purse.jpg",
        name: "Апельсины",
        description: "очень свежие оранжевые апельсины",
        category: "fruit fruit",
        price: 200,
        count: 1
      }
    ]);
    const totalProductsPrice = computed(
      () =>
        products.value.reduce((acc, itm) => {
          acc += itm.price * itm.count;
          return acc;
        }, 0)
    );
    function asd(val) {
      console.log(val);
      products.value.find(itm => itm.id === val.id).count = val.count
    }
    return {
      asd,
      products,
      totalProductsPrice
    };
  },
  components: { AppPage, ProductList }
};
</script>

<style>
.p-inputtext:enabled:focus {
  box-shadow: none !important;
}
.p-inputtext {
  border: none;
  text-align: center;
  width: 41px;
}
.product-info {
  flex: 1 1 auto;
}
.product-img {
  /* padding: .5rem; */
  max-width: 200px;
}
</style>
