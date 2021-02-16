<template>
  <Menubar :model="items" style="z-index: 999">
    <template #start>
      <h2 class="p-mt-0 p-mb-1">Панель управления |</h2>
    </template>
    <template #end>
      <Button :label="$store.getters['auth/userName']" class="p-button-secondary p-button-text"/>
      <Button label="Выход" class="p-button-secondary p-button-text" icon="pi pi-sign-out" @click="logOut"/>
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";
import Button from "primevue/button";
export default {
  data() {
    return {
      items: [
        {
          label: "Менеджер товаров",
          icon: "pi pi-sliders-h",
          to: "/admin/product",
        },
        {
          label: "Редактор категории",
          icon: "pi pi-tags",
          to: "/admin/categories"
        }
      ]
    };
  },
  methods: {
      logOut(){
        this.$store.dispatch('auth/logOut')
        this.$router.push('/')
      }
    },
  components: { Menubar, Button }
};
</script>

<style scoped>
.p-menubar {
  position: sticky;
  top: 0;
  border: 0 !important;
  margin: 0 -8px;
  padding: 0.7rem !important;
  box-shadow: 0px 3px 4px -1px;
}
</style>
