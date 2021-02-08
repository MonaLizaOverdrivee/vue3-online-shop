<template>
  <div class="p-col-12 p-d-flex product-list">
    <img :src="image" class="product-img p-shadow-2" />
    <div class="product-info p-ml-3">
      <h3 class="p-mt-0 p-mb-1">{{ title }}</h3>
      <p class="p-m-0">Описание товара</p>
      <Button
        :label="category"
        class="p-button-text p-button-plain categories"
        icon="pi pi-sun"
      />
    </div>
    <div
      class="p-flex-column p-d-flex"
      :class="{
        'p-jc-between': $route.path === '/cart',
        'p-jc-end': $route.path === '/'
      }"
    >
      <Button
        icon="pi pi-times"
        class="p-button-rounded p-button-danger p-button-text p-as-end"
        @click="$store.commit('cart/REMOVE_PRODUCTS', id)"
        style="width: auto"
        v-if="$route.path === '/cart'"
      />
      <div>
        <p class="p-text-right product-price">{{ price }} РУБ</p>
        <InputNumber
          v-if="$route.path === '/cart'"
          :id="id + 'count'"
          v-model="quantity"
          showButtons
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          mode="decimal"
          :min="1"
          :max="99"
          @input="
            $store.commit('cart/CHANGE_QUANTITY', {
              quantity,
              id
            })
          "
        />
        <Button icon="pi pi-shopping-cart" label="В корзину" v-else></Button>
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
export default {
  props: ["data"],
  setup(props) {
    return {
      quantity: props.data.quantity,
      price: props.data.price,
      title: props.data.title,
      image: props.data.img,
      // description: props.data.description,
      category: props.data.category,
      id: props.data.id
    };
  },
  components: { InputNumber, Button }
};
</script>

<style scoped>
.product-list {
  border-bottom: 1px solid gray;
  padding: 1rem;
}
.product-price {
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}
.p-button.categories {
  padding-left: 0;
}

.p-inputnumber >>> .p-inputnumber-input:enabled:focus {
  box-shadow: none !important;
}
.p-inputnumber >>> .p-inputnumber-input {
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
  max-height: 150px;
}
</style>
