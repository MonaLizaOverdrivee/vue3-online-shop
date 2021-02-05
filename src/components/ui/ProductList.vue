<template>
  <div class="p-col p-d-flex">
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
    <div class="p-text-right">
      <Button
        icon="pi pi-times"
        class="p-button-rounded p-button-danger p-button-outlined p-button-sm"
      />
      <p class="p-pr-2">{{ price }} РУБ</p>
      <InputNumber
        :id="id + 'count'"
        v-model="countProduct"
        showButtons
        buttonLayout="horizontal"
        decrementButtonClass="p-button-rounded p-button-text"
        incrementButtonClass="p-button-rounded p-button-text"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        mode="decimal"
        :min="1"
        :max="99"
        @input="$emit('priceProduct', {count:countProduct, id })"
      />
    </div>
  </div>
</template>

<script>
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import { ref, computed } from "vue";
export default {
  emits: ['priceProduct'],
  props: ["data"],
  setup(props) {
    const countProduct = ref(1);
    const total = computed(() => countProduct.value * props.data.price);
    return {
      countProduct,
      total,
      price: props.data.price,
      title: props.data.name,
      image: props.data.image,
      // description: props.data.description,
      category: props.data.category,
      id:props.data.id
    };
  },
  components: { InputNumber, Button }
};
</script>

<style scoped>
.p-button.categories {
  padding-left: 0;
}
</style>
