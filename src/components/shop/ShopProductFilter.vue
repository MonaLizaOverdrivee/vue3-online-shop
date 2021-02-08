<template>
  <ShopFilterInput v-model="filterData.search"/>
  <ShopFilterCategory v-model="filterData.category"/>
</template>

<script>
import { computed, reactive, watch } from 'vue'
import ShopFilterCategory from "./ShopFilterCategory";
import ShopFilterInput from "./ShopFilterInput";
import { useRouter } from 'vue-router';
export default {
setup() {
  const router = useRouter()
  const filterData = reactive({
    search: null,
    category: null,
  })
 const currentParam = computed(() => {
  return Object.keys(filterData).reduce((acc, itm) => {
      if(filterData[itm]) acc[itm] = filterData[itm]
      return acc
    },{} )
 } )
  watch(filterData, () => {
    router.push({query: currentParam.value})
  })
  return {
   filterData
  }
},
  components: { ShopFilterInput, ShopFilterCategory }
}
</script>

<style>

</style>