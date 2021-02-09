<template>
      <Toolbar class="p-mb-4">
        <template #left>
            <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
        </template>

        <template #right>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
        </template>
    </Toolbar>
    <DataTable :value="products">
      <Column selectionMode="multiple" headerStyle="width: 3rem" :exportable="false"></Column>
      <Column field="id" header="ID"/>
      <Column field="title" header="Наименование"/>
      <Column header="Image">
                <template #body="slotProps">
                <img :src="slotProps.data.img" :alt="slotProps.data.img" class="product-image p-shadow-2" />
            </template>
        </Column>
      <Column header="Цена">
        <template #body="slotProps">
                {{ slotProps.data.price }} РУБ
            </template>
      </Column>
      <Column field="category" header="Категория"/>
      <Column field="count" header="Количество"/>
      <Column :exportable="false">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editProduct(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
</template>

<script>
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import Button from "primevue/button";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { computed } from 'vue';
export default {
  props:['data'],
  setup(props){
    const products = computed(() => props.data)
    console.log(props.data)
    return {
     products
    }
  },
  components: { Toolbar, Button, FileUpload, DataTable, Column }
}
</script>

<style scoped>
.product-image {
  width: 100px;
}
</style>