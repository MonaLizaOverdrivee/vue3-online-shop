<template>
  <AppPage>
    <CategoryTable :data="categories" />
  </AppPage>
</template>

<script>
import AppPage from "../../components/ui/AppPage";
import CategoryTable from "../../components/admin/category/CategoryTable";
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";
export default {
  setup() {
    const store = useStore();
    onBeforeMount(() => store.dispatch("shop/getCategories"));
    return {
      categories: computed(() => store.getters["shop/categories"])
    };
  },
  components: { AppPage, CategoryTable }
};
</script>

