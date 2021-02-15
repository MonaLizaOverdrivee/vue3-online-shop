<template>
  <Button
    @click="
      addToCart();
    "
    :label="label"
    icon="pi pi-shopping-cart"
    :disabled="count === 0"
    v-if="!quantityInCart || count === 0"
  ></Button>
  <!-- Использовал v-show вместо v-else из-за ошибки в самом компаненте фрайморка который пытается ссылаться на удалённый элемент -->
  <InputNumber
    v-show="quantityInCart && count !== 0"
    :id="id + 'count'"
    v-model="quantity"
    showButtons
    buttonLayout="horizontal"
    incrementButtonIcon="pi pi-plus"
    decrementButtonIcon="pi pi-minus"
    mode="decimal"
    :min="0"
    :max="count"
    @input="incQuantity"
  />
</template>

<script>
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import { useAddCart } from '../../use/addCart'
export default {
  props: {
    data: Object,
    label: {
      type: String,
      default: ''
    }
  },
  setup(props) {
  return {
    ...useAddCart(props),
    count: props.data.count,
    id: props.data.id
  };
  },
  components: { Button, InputNumber },
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
</style>
