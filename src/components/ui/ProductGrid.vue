<template>
  <div class="p-col-4 p-md-4">
    <div class="product-grid-item p-p-3">
      <div class="product-grid-item-top">
        <div>
          <i class="pi pi-tag product-category-icon"></i>
          <span class="product-category">{{ category }}</span>
        </div>
        <span :class="'count-quantity count-quantity-' + quantityClass">{{
          quantityText
        }}{{count}}</span>
      </div>
      <div class="product-grid-item-content">
        <img :src="img" :alt="title" />
        <div class="product-name">{{ title }}</div>
        <div class="product-description">Описание товаров</div>
      </div>
      <div class="product-grid-item-bottom">
        <span class="product-price">{{ price }} РУБ</span>
        <Button
          @click="addToCart();incQuantity()"
          icon="pi pi-shopping-cart"
          :disabled="count === 0"
          v-if="inCart"
        ></Button>
        <!-- Использовал v-show вместо v-else из-за ошибки в самом компаненте фрайморка который пытается ссылаться на удалённый элемент -->
        <InputNumber
          v-show="!inCart"
          :id="id + 'count'"
          v-model="quantity"
          showButtons
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          mode="decimal"
          :min="0"
          :max="99"
          @input="incQuantity"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import { computed, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  props: ["data"],
  setup(props) {
    const store = useStore();
    const cart = computed(() => store.getters['cart/cart'])
    const quantityInCart = computed(() => cart.value[props.data.id] ? cart.value[props.data.id] : 0 )
    const product = reactive(props.data);
    const inCart = computed(() => quantity.value === 0)
    const quantity = ref(quantityInCart.value)
    const quantityText = computed(() =>
      props.data.count < 1
        ? "Товар закончился"
        : props.data.count < 11
        ? "Осталось мало"
        : "В наличии"
    );
    const quantityClass = computed(() =>
      props.data.count < 1 ? "danger" : props.data.count < 11 ? "warning" : "success"
    );
    function incQuantity() {
      store.commit('cart/SET_CART', { id: props.data.id, quantity: quantity.value })
      store.commit('shop/SET_COUNT', { id: props.data.id, count: quantity.value })
    }
    function addToCart(){
      quantity.value = 1
      // console.log(toRefs(product))
    }
    // function removeInCart() {
    //    store.commit('cart/SET_CART', {id: product.id, quantity: -1})
    //   store.commit('shop/SET_COUNT', {id: product.id, count: 1})
    // }
    return {
      addToCart,
      cart,
      inCart,
      ...toRefs(product),
      // price: props.data.price,
      // title: props.data.title,
      // img: props.data.img,
      // description: props.data.description,
      // category: props.data.category,
      // count: computed(() => props.data.count),
      // id: props.data.id,
      incQuantity,
      quantityText,
      quantityClass,
      quantity
    };
  },
  components: { Button, InputNumber }
};
</script>

<style scoped>
.p-inputnumber >>> .p-inputnumber-input:enabled:focus {
  box-shadow: none !important;
}
.p-inputnumber >>> .p-inputnumber-input {
  border: none;
  text-align: center;
  width: 41px;
}
.count-quantity {
  padding: 0.2rem;
  border-radius: 5px;
}
.count-quantity-danger {
  background: rgb(255, 0, 0, 0.3);
}
.count-quantity-warning {
  background: rgb(255, 255, 0, 0.3);
}
.count-quantity-success {
  background: rgb(0, 128, 0, 0.3);
}
.p-dropdown {
  width: 14rem;
  font-weight: 400;
}
.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}
.product-description {
  margin: 0 0 1rem 0;
}
.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}
.product-category {
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
