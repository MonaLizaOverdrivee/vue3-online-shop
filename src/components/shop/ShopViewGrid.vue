<template>
  <div class="p-col-4 p-md-4">
    <div class="product-grid-item p-p-3">
      <div class="product-grid-item-top">
        <div>
          <i class="pi pi-tag product-category-icon"></i>
          <span class="product-category">{{ category }}</span>
        </div>
        <span :class="quantityClass" v-text="quantityText"></span>
      </div>
      <div class="product-grid-item-content">
        <router-link :to="'/product/' + id" v-slot="{ navigate }"
          ><img :src="img" :alt="title" @click="navigate"
        /></router-link>
        <div class="product-name">{{ title }}</div>
        <div class="product-description">Описание товаров</div>
      </div>
      <div class="product-grid-item-bottom">
        <span class="product-price">{{ price }} РУБ</span>
       <AppAddButton :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import AppAddButton from '../ui/AppAddButton'
import { useCountStatusStyle } from "../../use/countViewStyle";
import { computed, reactive, toRefs } from "vue";
export default {
  props: ["data"],
  setup(props) {
    const count = computed(() => props.data.count);
    const product = reactive(props.data)
    return {
      ...useCountStatusStyle(count),
      ...toRefs(product)
    };
  },
  components: { AppAddButton }
};
</script>

<style scoped>
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
</style>
