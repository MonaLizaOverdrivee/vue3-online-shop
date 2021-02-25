<template>
  <DataTable :value="orders">
    <Column field="orderNumber" header="Code"></Column>
    <Column field="userId" header="userId"></Column>
    <Column header="time">
      <template #body="{ data }">
        {{ new Date(data.time).toLocaleString() }}
      </template>
    </Column>
    <Column field="price" header="price"></Column>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    store.dispatch("order/getAllOrders");
    const orders = computed(() => store.getters["order/order"]);
    console.log(orders);
    return {
      orders
    };
  },
  components: { DataTable, Column }
};
</script>

<style></style>
