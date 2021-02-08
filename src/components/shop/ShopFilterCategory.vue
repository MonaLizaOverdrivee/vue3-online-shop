<template>
  <Menu :model="category" class="asd"/>
</template>

<script>
import Menu from "primevue/menu";
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, { emit }) {
    const store = useStore()
    const menuItem = computed(() => store.getters['shop/categories'])
    const category = computed(() => menuItem.value.map(itm => ({
        label: itm.title,
        class: 'active',
        command: () =>  {
          emit('update:modelValue', itm.type); 
          },
      })
    ))
      console.log(category.value)
    return {
      category
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
