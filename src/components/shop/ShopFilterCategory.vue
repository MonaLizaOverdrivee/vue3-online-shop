<template>
  <Menu :model="menuItem" />
  <!-- Menu принемает массив объектов где объект - это настройка пункта меню, command - действие при клике -->
</template>

<script>
import Menu from "primevue/menu";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  emits: ["update:modelValue"],
  props: ["modelValue"],
  setup(_, { emit }) {
    const store = useStore();
    const route = useRoute();
    // const activeClass = computed(() => 'activer')
    const menuItem = computed(() => {
      const menu = store.getters["shop/categories"].map(itm => ({
        label: itm.title,
        class: computed(() =>
          itm.type === route.query.category ? "active" : ""
        ).value,
        command: () => {
          emit("update:modelValue", itm.type);
        }
      }));
      menu.unshift({
        label: "Все",
        command: () => emit("update:modelValue", undefined)
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
.p-menu >>> .p-menuitem.active {
  background: #e9ecef !important;
  border-left: 4px solid var(--primary-color);
}
</style>
