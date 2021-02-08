<template>
  <div class="p-field p-fluid">
      <span :class="['p-input-icon-left', {'p-input-icon-right': value}]">
        <i class="pi pi-search" />
        <i class="pi pi-times" v-show="value" @click="clear" style="cursor: pointer"/>
        <InputText type="text" v-model="value" placeholder="Поиск" />
    </span>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import {  ref, watch } from 'vue';
import { useRoute } from 'vue-router'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
setup(_, { emit }) {
  const route = useRoute()
  const value = ref(route.query.search)
  function clear() {
    value.value = null
  }
  console.log(value)
  watch(value, () => emit('update:modelValue', value))
  return {
    value,
    clear
  }
},
components:{ InputText }
}
// route.query.search = value.value
//const model = {search, category}
//const currentQuery = { search: search.value, category: category.value }
//const query = computed(() => Object.keys(model).reduced((acc, qry) => if(currentQuery[qry]) acc[model.qry] = currentQuery[qry], acc))
//watch(currentQuery, () => Object.keys(query).length ? router.push({query: query.value} : router.push(route.path)))

</script>

<style>

</style>