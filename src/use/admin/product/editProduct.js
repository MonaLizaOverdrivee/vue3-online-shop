import {useStore} from "vuex";
import {ref,computed} from 'vue'

export function useEdit() {
  const store = useStore();
  const currentProduct = ref({})
  const changeableProduct = ref({})

  const checkChangeData = computed(() => Object.keys(currentProduct.value).reduce((acc, itm) => {
    return (
      currentProduct.value[itm] === changeableProduct.value[itm] &&
      acc
    );
  }, true))
  function edit(product) {
    changeableProduct.value = {...product}
    currentProduct.value = {...product}

  }
  function changeDataProduct() {
    store.dispatch('shop/requestToChangeProduct', changeableProduct.value)
    console.log(changeableProduct.value)
  }
  function cancelChangeData(){
    changeableProduct.value =null
    currentProduct.value = null
  }
  return {
    edit,
    changeableProduct,
    checkChangeData,
    changeDataProduct,
    cancelChangeData
  }
}
