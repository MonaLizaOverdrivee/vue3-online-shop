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
    :closable="false"
    v-model:visible="productDialog"
    :style="{ width: '450px' }"
    header="Детали"
    :modal="true"
    class="p-fluid"
    @hide="hideDialogProduct"
    :autoZIndex="false"
  >
    <ProductTableleItemModal
      :product="selectedProducts"
      :categoryData="category"
      :submitFlag="submitFlag"
    />
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
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["data"],
  setup(props) {
    const store = useStore();
    store.dispatch("shop/getCategories");
    const products = computed(() => props.data);
    const category = computed(() => store.getters["shop/categories"]);

    const productDialog = ref(false);
     const confirm = useConfirm();
     console.log(confirm)
    const submitFlag = ref(false);
    const MODEL_REQUIRED_FORM = {
      title: null,
      count: null
    };
    function openNew() {
      selectedProducts.value = MODEL_REQUIRED_FORM
      oldSelectedProducts.value = Object.assign({}, selectedProducts.value)
      productDialog.value = true;
      submitFlag.value = true;
    }
    function editProduct(value) {
      productDialog.value = true;
      selectedProducts.value = value;
    }
    function hideDialogProduct() {
      console.log(checkChangeData.value)
      if(!checkChangeData.value) {
        confirm.require({
            message: 'Есть несохранённые данные, всё ровно закрыть?',
            header: 'Подтвердите действие',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                selectedProducts.value = MODEL_REQUIRED_FORM;
                productDialog.value = false;
            },
            reject: () => {
                //callback to execute when user rejects the action
            }
        });
      }else {
      selectedProducts.value = MODEL_REQUIRED_FORM;
      productDialog.value = false;
      }
    }
    const deleteProductsDialog = ref(false);
    const selectedProducts = ref(MODEL_REQUIRED_FORM);
    const oldSelectedProducts = ref(null);
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
    const checkChangeData = computed(() =>
      Object.keys(oldSelectedProducts.value).reduce((acc, itm) => {
        console.log('old', oldSelectedProducts.value[itm])
        console.log('current', selectedProducts.value[itm])
        return (oldSelectedProducts.value[itm] === selectedProducts.value[itm]) && acc
      }, true)
    )
    const checkRequiredForm = computed(() =>
      Object.keys(selectedProducts.value).reduce((acc, itm) => {
        return selectedProducts.value[itm] && acc;
      }, true)
    );
    async function saveProduct() {
      if (checkRequiredForm.value) {
        try {
          await store.dispatch(
            "shop/requestNewProduct",
            selectedProducts.value
          );
          selectedProducts.value = MODEL_REQUIRED_FORM;
          productDialog.value = false;
        } catch (e) {
          console.log(e);
        }
      } else {
        submitFlag.value = false;
      }
    }
    return {
      submitFlag,
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
