<template>
  <AppPage>
    <div class="p-grid">
      <div class="p-col-8 p-d-flex p-flex-column">
        <div class="p-col" style="flex-grow: 0">
          <h2 class="p-m-0">Товары</h2>
          <h3 class="p-text-center" v-if="!products.length">
            В корзину ещё ничего не добавлено
          </h3>
        </div>

        <CartProductList
          v-for="product in products"
          :key="product.id"
          :data="product"
        />
      </div>

      <div class="p-col p-d-flex p-flex-column p-as-start container-total">
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
        <div class="p-col p-fluid">
          <Button label="Оплатить" :disabled="!auth"/>
          <p class="p-text-center" v-if="!auth">Для оплаты <a href="" class="link-component">войдите</a> или <a href="" class="link-component" > зарегистрируйтесь</a></p>
        </div>
        </div>
      </div>
  </AppPage>
</template>

<script>
import Button from "primevue/button";
import AppPage from "../components/ui/AppPage";
import CartProductList from "../components/cart/CartProductList";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const products = computed(() => store.getters["cart/products"]);
    const auth = computed(() => store.getters['auth/isAuthenticated'])
    const totalProductsPrice = computed(() =>
      products.value.reduce((acc, itm) => {
        acc += itm.price * itm.quantity;
        return acc;
      }, 0)
    );
    return {
      auth,
      products,
      totalProductsPrice
    };
  },
  components: { AppPage, CartProductList, Button }
};
</script>

<style scoped>
.container-total {
   position: sticky;
  top: 4rem;
}
.link-component {
  color: var(--primary-color)
}
</style>
