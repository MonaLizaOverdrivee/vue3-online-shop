<template>
  <Toolbar class="p-mb-4">
    <template #left>
      <Button
        label="Создать"
        icon="pi pi-plus"
        class="p-button-success p-mr-2"
        @click="showModal"
      />
      <Button
        label="Удалить"
        icon="pi pi-trash"
        class="p-button-danger"
        @click="confirmDeleteSelected(selectedCategories)"
        :disabled="!selectedCategories || !selectedCategories.length"
      />
    </template>

    <template #right>
      <FileUpload
        mode="basic"
        accept="image/*"
        :maxFileSize="1000000"
        label="Import"
        chooseLabel="Import"
        class="p-mr-2 p-d-inline-block"
      />
      <Button
        label="Export"
        icon="pi pi-upload"
        class="p-button-help"
        @click="exportCSV($event)"
      />
    </template>
  </Toolbar>
  <DataTable :value="data" v-model:selection="selectedCategories">
    <Column
      selectionMode="multiple"
      headerStyle="width: 3rem"
      :exportable="false"
    ></Column>
    <Column field="id" header="ID" :sortable="true" />
    <Column field="title" header="Наименование" :sortable="true" />
    <Column field="type" header="Системное имя" :sortable="true" />
    <Column :exportable="false">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-success p-mr-2"
          @click="showModal(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-warning"
          @click="confirmDeleteSelected([slotProps.data])"
        />
      </template>
    </Column>
  </DataTable>
  <CategoryTableItemModal
    :visibilityModal="visibilityModal"
    @checkChange="hideModal"
    @hide="visibilityModal = false"
    :category="category"
  />
  <pre>{{ category }}</pre>
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import Toolbar from "primevue/toolbar";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import CategoryTableItemModal from "./CategoryTableItemModal";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useDelete } from "../../../use/admin/category/deleteCategories";
export default {
  props: ["data"],
  setup(props) {
    console.log(props.data);
    const store = useStore();
    store.dispatch("shop/getCategories");
    const confirm = useConfirm();
    const selectedCategories = ref(null);
    const MODEL = {
      type: undefined,
      title: undefined
    };
    const category = reactive({ category: { ...MODEL } });
    const visibilityModal = ref(false);

    function showModal(val) {
      console.log(val.id);
      category.category = { ...val };
      console.log(category.category);
      visibilityModal.value = true;
    }
    function hideModal(bool) {
      if (!bool) {
        confirm.require({
          acceptLabel: "Да",
          rejectLabel: "Нет",
          message: "Есть несохранённые данные, всё равно закрыть?",
          header: "Подтвердите действие",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            selectedCategories.value = null;
            visibilityModal.value = false;
            category.category = { ...MODEL };
          }
        });
      } else {
        selectedCategories.value = null;
        visibilityModal.value = false;
        category.category = { ...MODEL };
      }
    }
    return {
      visibilityModal,
      showModal,
      category,
      hideModal,
      selectedCategories,
      ...useDelete(selectedCategories)
    };
  },
  components: {
    Toolbar,
    Button,
    FileUpload,
    DataTable,
    Column,
    CategoryTableItemModal,
    ConfirmDialog
  }
};
</script>

<style scoped>
.product-image {
  width: 100px;
}
</style>
