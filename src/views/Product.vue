<template>
  <div class="p-grid p-pt-5">
    <div class="p-col-3">
      <img class="page__img p-shadow-2" :src="product.img" alt="" />
    </div>
    <div class="p-col p-d-flex p-flex-column">
      <h1 class="p-m-0">{{ product.title }}</h1>
      <div class="discription">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
          temporibus, consequuntur laboriosam quisquam recusandae esse dolore
          quam quod soluta dolorem officia similique. Sit, sunt. Voluptatibus
          sint enim neque quam ipsam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Itaque libero enim nulla quasi asperiores tenetur
          error autem fugiat nostrum veritatis unde officiis amet aut sunt, ex
          iure nemo illum at?
        </p>
      </div>
      <div class="p-d-flex p-jc-between">
        <span class="product-price"><strong>Цена:</strong> {{ product.price }} РУБ</span>
        <AppAddButton :data="product" label="Добавить в корзину" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import AppAddButton from "../components/ui/AppAddButton";
export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    store.commit("shop/SET_SELECTED_PRODUCT", props.id);
    const product = computed(() => store.getters["shop/selectedProduct"]);
    return {
      product
    };
  },
  components: { AppAddButton }
};
</script>

<style scoped>
.discription {
  flex: 1 1 auto;
}
.page__img {
  width: 100%;
}
</style>
