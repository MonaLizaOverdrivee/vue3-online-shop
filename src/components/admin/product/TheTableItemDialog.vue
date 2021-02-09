<template>
  <div class="p-d-flex p-jc-center">
    <img :src="product.img" :alt="product.img" class="product-image" />
  </div>
  <div class="p-field">
    <label for="img_url">URL картинки</label>
    <InputText
      id="img_url"
      v-model.trim="dataProduct.img"
      :class="{ 'p-invalid': submitted && !product.name }"
    />
    <small class="p-error">Name is required.</small>
  </div>
  <div class="p-field">
    <label for="name">Наименование</label>
    <InputText
      id="title"
      v-model.trim="dataProduct.title"
      :class="{ 'p-invalid': submitted && !product.name }"
    />
    <small class="p-error">Name is required.</small>
  </div>
  <div class="p-field">
    <label for="description">Описание</label>
    <Textarea
      id="description"
      v-model="dataProduct.description"
      rows="3"
      cols="20"
    />
  </div>
  <div class="p-field">
    <label class="p-mb-3">Category</label>
    <div class="p-formgrid p-grid">
      <div
        class="p-field-radiobutton p-col-6"
        v-for="itm in categories"
        :key="itm.id"
      >
        <RadioButton
          :id="'category' + itm.id"
          name="category"
          :value="itm.type"
          v-model="dataProduct.category"
        />
        <label :for="'category' + itm.id">{{ itm.title }}</label>
      </div>
    </div>
  </div>
  <div class="p-formgrid p-grid">
    <div class="p-field p-col">
      <label for="price">Цена</label>
      <InputNumber
        id="price"
        v-model="dataProduct.price"
        mode="currency"
        currency="RUB"
        locale="ru-RU"
      />
    </div>
    <div class="p-field p-col">
      <label for="quantity">Количество</label>
      <InputNumber id="Count" v-model="dataProduct.count" integeronly />
    </div>
  </div>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { computed } from "vue";

export default {
  props: ["product", "categoryData"],
  setup(props) {
    const dataProduct = computed(() => props.product);
    const categories = computed(() => props.categoryData);
    return {
      dataProduct,
      categories
    };
  },
  components: { RadioButton, InputNumber, InputText, Textarea }
};
</script>

<style scoped>
.product-image {
  width: 250px;
}
</style>
