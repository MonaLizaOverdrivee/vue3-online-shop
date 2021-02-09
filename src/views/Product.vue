<template>
  <div class="card">
    <h2>Компонент всё ещё в разработке!</h2>
    <h1>{{ product.title }}</h1>
    <img :src="product.img" alt="" />
    <p>{{ product.price }}</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { addCartView } from "../use/addCart";
export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    onMounted(async () => {
      await store.dispatch("shop/getSelectedProduct", props.id);
    });
    const product = computed(() => store.getters["shop/selectedProduct"]);
    console.log(addCartView);
    return {
      product
    };
  }
};
</script>

<style></style>
