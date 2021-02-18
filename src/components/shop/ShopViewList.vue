<template>
  <div class="p-col-12 p-d-flex product-container  p-p-3">
    <div>
      <router-link :to="'/product/' + id" v-slot="{ navigate }"
        ><img
          :src="img"
          :alt="title"
          @click="navigate"
          class="img-product p-shadow-2"
      /></router-link>
    </div>
    <div class="content-container p-d-flex p-flex-column p-pl-3">
      <div class="p-d-flex p-jc-between p-pt-1">
        <div>
          <h3 class="p-m-0">{{ title }}</h3>
        </div>
        <div><span :class="quantityClass" v-text="quantityText"></span></div>
      </div>
      <div style="" class="discription-product">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
        molestias accusantium mollitia beatae quas dolores quibusdam illo! Vel
        vitae veniam libero repellendus voluptas repellat vero sunt, debitis
        animi facilis ratione!
      </div>
      <div class="p-d-flex p-jc-between">
        <div>
          <span class="product-price">{{ price }} РУБ</span>
        </div>
        <div><AppAddButton :data="data" label="Добавить в корзину" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAddButton from "../ui/AppAddButton";
import { useCountStatusStyle } from "../../use/countViewStyle";
import { computed, reactive, toRefs } from "vue";
export default {
  props: ["data"],
  setup(props) {
    const count = computed(() => props.data.count);
    const product = reactive(props.data);
    return {
      ...useCountStatusStyle(count),
      ...toRefs(product)
    };
  },
  components: { AppAddButton }
};
</script>

<style scoped>
.img-product {
  width: 200px;
}
.discription-product {
  flex: 1 1 auto;
  margin-top: 1rem;
}
.product-container {
  border-bottom: 1px solid gray;
}
/* .content-container {
  padding-left: 1rem;
} */
</style>
