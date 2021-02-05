<template>
  <div class="p-col p-d-flex p-pb-3 product-list">
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
    <div class="p-flex-column p-jc-between p-d-flex">
      <Button
        icon="pi pi-times"
        class="p-button-rounded p-button-danger p-button-text p-as-end"
        @click="$store.commit('cart/REMOVE_PRODUCTS', id)"
        style="width: auto"
      />
      <div>
        <p class="p-text-right product-price">{{ price }} РУБ</p>
        <InputNumber
          :id="id + 'count'"
          v-model="quantityProduct"
          showButtons
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          mode="decimal"
          :min="1"
          :max="99"
          @input="
            $store.commit('cart/CHANGE_QUANTITY', {
              quantity: quantityProduct,
              id
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import { ref } from "vue";
export default {
  emits: ["priceProduct"],
  props: ["data"],
  setup(props) {
    const quantityProduct = ref(props.data.quantity);
    return {
      quantityProduct,
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
}
.product-price {
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: .5rem;
}
.p-button.categories {
  padding-left: 0;
}
</style>
