<template>
  <Dialog
    :closable="false"
    v-model:visible="visibility"
    :style="{ width: '450px' }"
    header="Детали"
    :modal="true"
    class="p-fluid"
  >
    <div class="p-field">
      <label for="type">Системное имя</label>
      <InputText
        id="type"
        v-model.trim="type"
        :class="{ 'p-invalid': tpError }"
      />
      <small class="p-error">{{ tpError }}</small>
    </div>
    <div class="p-field">
      <label for="title">Наименование</label>
      <InputText
        id="title"
        v-model.trim="title"
        :class="{ 'p-invalid': tError }"
      />
      <small class="p-error">{{ tError }}</small>
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
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useModal } from "../../../use/admin/category/editCategory";
import { computed } from "vue";

export default {
  emits: ["hide", "checkChange"],
  props: ["category", "visibilityModal"],
  setup(props, { emit }) {
    const visibility = computed(() => props.visibilityModal);
    // console.log("transfer to modal", category.category);
    return {
      visibility,
      ...useModal(props.category, emit)
    };
  },
  components: { InputText, Dialog, Button }
};
</script>

<style scoped>
.product-image {
  width: 250px;
}
</style>
