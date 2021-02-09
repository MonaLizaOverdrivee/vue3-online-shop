<template>
  <Menu :model="menuItem" class="asd" />
  <!-- Menu принемает массив объектов где объект - это настройка пункта меню, command - действие при клике -->
</template>

<script>
import Menu from "primevue/menu";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  emits: ["update:modelValue"],
  props: ["modelValue"],
  setup(_, { emit }) {
    const store = useStore();
    const menuItem = computed(() => {
      const menu = store.getters["shop/categories"].map(itm => ({
        label: itm.title,
        class: "active",
        command: () => {
          emit("update:modelValue", itm.type);
        }
      }));
      menu.unshift({
        label: "Все",
        command: () => emit("update:modelValue", null)
      });
      return menu;
    });
    return {
      menuItem
    };
  },
  components: { Menu }
};
</script>

<style scoped>
.p-menu {
  width: auto;
}
.p-menu >>> .p-menuitem-link.active {
  background: red !important;
}
</style>
