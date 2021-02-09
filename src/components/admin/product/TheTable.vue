<template>
  <Toolbar class="p-mb-4">
    <template #left>
      <Button
        label="Создать"
        icon="pi pi-plus"
        class="p-button-success p-mr-2"
        @click="openNew"
      />
      <Button
        label="Удалить"
        icon="pi pi-trash"
        class="p-button-danger"
        @click="confirmDeleteSelected"
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
  <DataTable :value="products" v-model:selection="selectedProducts">
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
          @click="editProduct(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-warning"
          @click="confirmDeleteSelectedOnce([slotProps.data])"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="productDialog"
    :style="{ width: '450px' }"
    header="Детали"
    :modal="true"
    class="p-fluid"
  >
    <TheTableItemDialog :product="selectedProducts" :categoryData="category" />
    <template #footer>
      <Button
        label="Отмена"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialogProduct"
      />
      <Button
        label="Сохранить"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveProduct"
      />
    </template>
  </Dialog>
  <Dialog
    v-model:visible="deleteProductsDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="p-d-flex p-ai-center p-jc-center">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span>Вы уверенны что хотите удалить выбранные позиции</span>
    </div>
    <template #footer>
      <Button
        label="Нет"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteProductsDialog = false"
      />
      <Button
        label="Да"
        icon="pi pi-check"
        class="p-button-text"
        @click="deleteProducts"
      />
    </template>
  </Dialog>
</template>

<script>
import Toolbar from "primevue/toolbar";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TheTableItemDialog from "./TheTableItemDialog";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["data"],
  setup(props) {
    const store = useStore();
    store.dispatch("shop/getCategories");
    const products = computed(() => props.data);
    const category = computed(() => store.getters["shop/categories"]);
    console.log(category.value);

    const productDialog = ref(false);
    function openNew() {
      productDialog.value = true;
      selectedProducts.value = {};
    }
    function editProduct(value) {
      productDialog.value = true;
      selectedProducts.value = value;
    }
    function hideDialogProduct() {
      selectedProducts.value = null;
      productDialog.value = false;
    }
    const deleteProductsDialog = ref(false);
    const selectedProducts = ref(null);
    function confirmDeleteSelected() {
      deleteProductsDialog.value = true;
    }
    function confirmDeleteSelectedOnce(value) {
      deleteProductsDialog.value = true;
      selectedProducts.value = value;
    }
    function deleteProducts() {
      store.commit("shop/REMOVE_PRODUCT", selectedProducts.value);
      deleteProductsDialog.value = false;
    }
    async function saveProduct() {
      try {
        await store.dispatch("shop/requestNewProduct", selectedProducts.value);
        selectedProducts.value = null;
        productDialog.value = false;
      } catch (e) {
        console.log(e);
      }
    }
    return {
      editProduct,
      productDialog,
      confirmDeleteSelectedOnce,
      products,
      deleteProducts,
      selectedProducts,
      confirmDeleteSelected,
      deleteProductsDialog,
      openNew,
      saveProduct,
      hideDialogProduct,
      category
    };
  },
  components: {
    Toolbar,
    Button,
    FileUpload,
    DataTable,
    Column,
    Dialog,
    TheTableItemDialog
  }
};
</script>

<style scoped>
.product-image {
  width: 100px;
}
</style>
