<template>
  <pre>{{ selectedProducts }}</pre>
  <button @click="testFoo">clicj</button>
  <Toolbar class="p-mb-4">
    <template #left>
      <Button
        label="Создать"
        icon="pi pi-plus"
        class="p-button-success p-mr-2"
        @click="showModal('new')"
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
  <DataTable :value="data" v-model:selection="selectedProducts" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]">
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
          @click="
            edit(slotProps.data);
            showModal('edit');
          "
        />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-warning"
          @click="confirmDeleteSelected([slotProps.data])"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    :closable="false"
    v-model:visible="visibilityModal"
    :style="{ width: '450px' }"
    header="Детали"
    :modal="true"
    class="p-fluid"
    :autoZIndex="false"
  >
    <ProductTableleItemModal
      :product="typeProduct"
      :categoryData="category"
      :submitFlag="checkRequiredForm"
    />
    <template #footer>
      <Button
        label="Отмена"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideModal(true)"
      />
      <Button
        label="Сохранить"
        icon="pi pi-check"
        class="p-button-text"
        @click="typeSubmit();hideModal(false)"
      />
    </template>
  </Dialog>
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import Toolbar from "primevue/toolbar";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProductTableleItemModal from "./ProductTableleItemModal";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useDelete } from "../../../use/admin/product/deleteProduct";
import { useEdit } from "../../../use/admin/product/editProduct";
import { useAdd } from "../../../use/admin/product/addProduct";
export default {
  props: ["data"],
  setup() {
    const store = useStore();
    store.dispatch("shop/getCategories");
    const category = computed(() => store.getters["shop/categories"]);
    const confirm = useConfirm();
    const selectedProducts = ref(null);
    const type = ref('')
    const { checkChangeData, edit, changeableProduct, changeDataProduct } = useEdit();
    const { save, newProduct, checkRequiredForm } = useAdd();

    const visibilityModal = ref(false);
    function showModal(val) {
      type.value = val
      visibilityModal.value = true;
    }
    function hideModal(bool) {
      if (!checkChangeData.value && bool) {
        confirm.require({
          acceptLabel: "Да",
          rejectLabel: "Нет",
          message: "Есть несохранённые данные, всё равно закрыть?",
          header: "Подтвердите действие",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            selectedProducts.value = null;
            visibilityModal.value = false;
          },
        });
      } else {
        selectedProducts.value = null;
        visibilityModal.value = false;
      }
    }
  const typeSubmit = computed(() => type.value === 'edit' ? changeDataProduct : save)
  const typeProduct = computed(() => type.value === 'edit' ? changeableProduct.value : newProduct)
    // const MODEL_REQUIRED_FORM = {
      //   count: null,
    //   title: null,
    //   category: null,
    //   price: null,
    //   img: null
    // };

    // function openNew() {
      //   selectedProducts.value = MODEL_REQUIRED_FORM;
    //   visibilityModal.value = true;
    //   submitFlag.value = true;
    // }
    // const submitFlag = ref(false);
    // const checkRequiredForm = computed(() =>
    //   Object.keys(selectedProducts.value).reduce((acc, itm) => {
    //     return selectedProducts.value[itm] && acc;
    //   }, true)
    // );

    // async function saveProduct() {
    //   if (checkRequiredForm.value) {
    //     try {
    //       await store.dispatch(
    //         "shop/requestchangeableProduct",
    //         selectedProducts.value
    //       );
    //       selectedProducts.value = MODEL_REQUIRED_FORM;
    //       visibilityModal.value = false;
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   } else {
    //     submitFlag.value = false;
    //   }
    // }
    console.log(checkRequiredForm)
    return {
      visibilityModal,
      showModal,
      hideModal,
      checkRequiredForm,
      // submitFlag,
      category,
      typeSubmit,
      typeProduct,

      selectedProducts,
      edit,
      ...useDelete(selectedProducts),
    };
  },
  components: {
    Toolbar,
    Button,
    FileUpload,
    DataTable,
    Column,
    Dialog,
    ProductTableleItemModal,
    ConfirmDialog,
  },
};
</script>

<style scoped>
.product-image {
  width: 100px;
}
</style>
