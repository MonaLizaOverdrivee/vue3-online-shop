<template>
  <Dialog
    :closable="false"
    v-model:visible="visibility"
    :style="{ width: '450px' }"
    header="Детали"
    :modal="true"
    class="p-fluid"
  >
    <div class="p-d-flex p-jc-center">
      <img :src="img" :alt="img" class="product-image" />
    </div>
    <div class="p-field">
      <label for="img_url">URL картинки</label>
      <InputText id="img_url" v-model.trim="img" />
    </div>
    <div class="p-field">
      <label for="name">Наименование</label>
      <InputText
        id="title"
        v-model.trim="title"
        :class="{ 'p-invalid': tError }"
      />
      <small class="p-error">{{ tError }}</small>
    </div>
    <div class="p-field">
      <label for="description">Описание</label>
      <Textarea id="description" v-model="discription" rows="3" cols="20" />
    </div>
    <div class="p-field">
      <label class="p-mb-3">Категория</label>
      <div class="p-formgrid p-grid" :class="{ 'p-invalid': cError }">
        <div
          class="p-field-radiobutton p-col-6"
          v-for="itm in categoryData"
          :key="itm.id"
        >
          <RadioButton
            :id="'category' + itm.id"
            name="category"
            :value="itm.type"
            v-model="category"
          />
          <label :for="'category' + itm.id">{{ itm.title }}</label>
        </div>
        <small class="p-error">{{ cError }}</small>
      </div>
    </div>
    <div class="p-formgrid p-grid">
      <div class="p-field p-col">
        <label for="price">Цена</label>
        <InputNumber
          id="price"
          v-model="price"
          mode="currency"
          currency="RUB"
          locale="ru-RU"
          :class="{ 'p-invalid': pError }"
        />
        <small class="p-error">{{ pError }}</small>
      </div>
      <div class="p-field p-col">
        <label for="quantity">Количество</label>
        <InputNumber
          id="Count"
          v-model="count"
          integeronly
          :class="{ 'p-invalid': cntError }"
        />
        <small class="p-error">{{ cntError }}</small>
      </div>
    </div>
    <template #footer>
      <Button
        label="Отмена"
        icon="pi pi-times"
        class="p-button-text"
        @click="hide"
      />
      <Button
        label="Сохранить"
        icon="pi pi-check"
        class="p-button-text"
        type="submit"
        @click="save"
      />
    </template>
  </Dialog>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useModal } from "../../../use/admin/product/modalDetail";
import { computed } from "vue";

export default {
  emits: ["hide", "checkChange"],
  props: ["product", "categoryData", "visibilityModal"],
  setup(props, { emit }) {
    const visibility = computed(() => props.visibilityModal);
    console.log("transfer to modal", props.product);
    return {
      visibility,
      ...useModal(props.product, emit)
    };
  },
  components: { RadioButton, InputNumber, InputText, Textarea, Dialog, Button }
};
</script>

<style scoped>
.product-image {
  width: 250px;
}
</style>
