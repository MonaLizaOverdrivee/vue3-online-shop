<template>
  <div class="p-d-flex p-jc-center">
    <pre>{{ product }}</pre>
    <img :src="product.img" :alt="product.img" class="product-image" />
  </div>
  <div class="p-field">
    <label for="img_url">URL картинки</label>
    <InputText autofocus required id="img_url" v-model.trim="dataProduct.img" />
  </div>
  <div class="p-field">
    <label for="name">Наименование</label>
    <InputText
      required
      id="title"
      v-model.trim="dataProduct.title"
      :class="{ 'p-invalid': !dataProduct.title && submitFlag }"
    />
    <small class="p-error" v-if="!dataProduct.title && submitFlag"
      >Укажите наименование товара</small
    >
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
    <label class="p-mb-3">Категория</label>
    <div
      class="p-formgrid p-grid"
      :class="{ 'p-invalid': !dataProduct.category && !submitFlag }"
    >
      <div
        class="p-field-radiobutton p-col-6"
        v-for="itm in categoryData"
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
      <small class="p-error" v-if="!dataProduct.category && !submitFlag"
        >Выбирете категорию</small
      >
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
        :class="{ 'p-invalid': !dataProduct.price && !submitFlag }"
      />
      <small class="p-error" v-if="!dataProduct.price && !submitFlag"
        >Укажите цену товара за шт.</small
      >
    </div>
    <div class="p-field p-col">
      <label for="quantity">Количество</label>
      <InputNumber
        id="Count"
        v-model="dataProduct.count"
        integeronly
        :class="{ 'p-invalid': !dataProduct.count && !submitFlag }"
      />
      <small class="p-error" v-if="!dataProduct.count && !submitFlag"
        >Укажите количество товаров</small
      >
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
  props: ["product", "categoryData", "submitFlag"],
  setup(props) {
    const dataProduct = computed(() => props.product);
    return {
      dataProduct,
      submitig: computed(() => props.submitFlag)
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
