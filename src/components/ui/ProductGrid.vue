<template>
  <div class="p-col-4 p-md-4">
    <div class="product-grid-item p-p-3">
      <div class="product-grid-item-top">
        <div>
          <i class="pi pi-tag product-category-icon"></i>
          <span class="product-category">{{ category }}</span>
        </div>
        <span :class="'count-quantity count-quantity-' + quantityClass">{{ quantity }}</span
        >
      </div>
      <div class="product-grid-item-content">
        <img
          :src="img"
          :alt="title"
        />
        <div class="product-name">{{ title }}</div>
        <div class="product-description">Описание товаров</div>
      </div>
      <div class="product-grid-item-bottom">
        <span class="product-price">{{ price }} РУБ</span>
        <Button
          @click="addToCart"
          icon="pi pi-shopping-cart"
          :disabled="count === 0"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import {  computed, reactive } from 'vue';
import { useStore } from 'vuex';
export default {
  props: ["data"],
  setup(props) {
    const store = useStore()
    const product = reactive(props.data)
    const quantity = computed(() => product.count < 1 ? 'Товар закончился' : product.count < 11 ? 'Осталось мало' : 'В наличии')
    const quantityClass = computed(() => product.count < 1 ? 'danger' : product.count < 11 ? 'warning' : 'success')
    function addToCart() {
      store.commit('cart/SET_CART', {id: product.id, quantity: 1})
      store.commit('shop/SET_COUNT', {id: product.id, count: -1})
    }
    // function removeInCart() {
    //    store.commit('cart/SET_CART', {id: product.id, quantity: -1})
    //   store.commit('shop/SET_COUNT', {id: product.id, count: 1})
    // }
    return {
      price: product.price,
      title: product.title,
      img: product.img,
      // description: props.data.description,
      category: product.category,
      count: product.count,
      addToCart,
      quantity,
      quantityClass
    };
  },
  components: { Button },
};
</script>

<style scoped>
.count-quantity {
  padding: .2rem;
  border-radius: 5px;
}
.count-quantity-danger{
  background: rgb(255, 0, 0, 0.3);
}
.count-quantity-warning{
  background: rgb(255, 255, 0, 0.3);
}
.count-quantity-success{
  background: rgb(0, 128, 0, 0.3);
}
.p-dropdown{
  width: 14rem;
  font-weight: 400;
}
.product-name{
  font-size: 1.5rem;
  font-weight: 700;
}
.product-description{
  margin: 0 0 1rem 0;
}
.product-category-icon{
  vertical-align: middle;
  margin-right: 0.5rem;
}
.product-category{
  font-weight: 600;
  vertical-align: middle;
}
.product-grid-item {
  margin: 0.5rem;
  border: 1px solid #dee2e6;
}
.product-grid-item .product-grid-item-bottom,
.product-grid-item .product-grid-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-grid-item img {
  width: 75%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 2rem 0;
}
.product-grid-item .product-grid-item-content {
  text-align: center;
}
.product-grid-item .product-price {
  font-size: 1.2rem;
  font-weight: 400;
}
</style>
