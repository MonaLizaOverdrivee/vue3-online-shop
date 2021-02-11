import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useValid } from './validation'

export function useAdd() {
  const newProduct =  reactive({})
  const store = useStore();

  const { checkRequiredForm } = useValid(newProduct)

  function save(){
    if(checkRequiredForm) store.dispatch('shop/requestNewProduct', newProduct)
  }
  return {
    newProduct,
    save,
    checkRequiredForm
  }
}