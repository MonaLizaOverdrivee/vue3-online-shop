<template>
  <div class="p-col-12 p-d-flex product-list">
    <img :src="img" class="product-img p-shadow-2" @click="$router.push('/product/' + id)"/>
    <div class="product-info p-ml-3">
      <h3 class="p-mt-0 p-mb-1">{{ title }}</h3>
      <p class="p-m-0">Описание товара</p>
      <Button
        :label="category"
        class="p-button-text p-button-plain categories"
        icon="pi pi-sun"
        @click="$router.push(`/?category=${category}`)"
      />
    </div>
    <div class="p-flex-column p-d-flex p-jc-between">
      <Button
        icon="pi pi-times"
        class="p-button-rounded p-button-danger p-button-text p-as-end"
        @click="removeProduct"
        style="width: auto"
      />
      <div>
        <p class="p-text-right product-price">{{ price }} РУБ</p>
        <InputNumber
          :id="id + 'count'"
          v-model="quantity"
          showButtons
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          mode="decimal"
          :min="1"
          :max="count"
          @input="incQuant"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  props: ["data"],
  setup(props) {
    const product = reactive(props.data);
    const store = useStore();
    function removeProduct() {
      store.commit('cart/REMOVE_PRODUCTS', props.data.id)
      store.commit('shop/SET_COUNT', {id:props.data.id, count: props.data.count})
    }
    function incQuant(e) {
      const quantity = e.value;
      store.commit("cart/SET_CART", {
        ...props.data,
        quantity: quantity
      });
    }
    return {
      incQuant,
      removeProduct,
      ...toRefs(product)
      // description: props.data.description,
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
  cursor: pointer;
  max-width: 200px;
  max-height: 150px;
}
</style>
