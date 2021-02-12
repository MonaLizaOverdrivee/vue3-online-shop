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
        @click="confirmDeleteSelected(selectedProducts)"
        :disabled="!selectedProducts || !selectedProducts.length"
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
  <DataTable :value="data" v-model:selection="selectedProducts">
    <Column
      selectionMode="multiple"
      headerStyle="width: 3rem"
      :exportable="false"
    ></Column>
    <Column field="id" header="ID" :sortable="true" />
    <Column field="title" header="Наименование" :sortable="true" />
    <Column header="Картинка">
      <template #body="slotProps">
        <img
          :src="slotProps.data.img"
          :alt="slotProps.data.img"
          class="product-image p-shadow-2"
        />
      </template>
    </Column>
    <Column header="Цена" :sortable="true">
      <template #body="slotProps"> {{ slotProps.data.price }} РУБ </template>
    </Column>
    <Column field="category" header="Категория" :sortable="true" />
    <Column field="count" header="Количество" :sortable="true" />
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
  <ProductTableleItemModal
    :visibilityModal="visibilityModal"
    @checkChange="hideModal"
    @hide="visibilityModal = false"
    :product="product"
    :categoryData="category"
  />
  <pre>{{ product }}</pre>
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import Toolbar from "primevue/toolbar";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProductTableleItemModal from "./ProductTableleItemModal";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useDelete } from "../../../use/admin/product/deleteProduct";
export default {
  props: ["data"],
  setup(props) {
    console.log(props.data);
    const store = useStore();
    store.dispatch("shop/getCategories");
    const category = computed(() => store.getters["shop/categories"]);
    const confirm = useConfirm();
    const selectedProducts = ref(null);
    const MODEL = {
      img: undefined,
      discription: undefined,
      price: undefined,
      category: undefined,
      title: undefined,
      count: undefined
    };
    const product = reactive({ product: { ...MODEL } });
    const visibilityModal = ref(false);

    function showModal(val) {
      console.log(val.id);
      product.product = { ...val };
      console.log(product.product);
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
            selectedProducts.value = null;
            visibilityModal.value = false;
          }
        });
      } else {
        selectedProducts.value = null;
        visibilityModal.value = false;
      }
    }
    return {
      visibilityModal,
      showModal,
      product,
      category,
      hideModal,
      selectedProducts,
      ...useDelete(selectedProducts)
    };
  },
  components: {
    Toolbar,
    Button,
    FileUpload,
    DataTable,
    Column,
    ProductTableleItemModal,
    ConfirmDialog
  }
};
</script>

<style scoped>
.product-image {
  width: 100px;
}
</style>
