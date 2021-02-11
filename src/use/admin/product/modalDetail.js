import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

export function useModal(product) {
const currentProduct = reactive({...product})

const { value: img, errorMessage: iError, handleBlur: iBlur } = useField()
const { value: title, errorMessage: tError, handleBlur: tBlur } = useField()
const { value: discription, errorMessage: dError, handleBlur: dBlur } = useField()
const { value: category, errorMessage: cError, handleBlur: cBlur } = useField()
const { value: price, errorMessage: pError, handleBlur: pBlur } = useField()
const { value: count, errorMessage: cntError, handleBlur: cntBlur } = useField()

 Object.keys(currentProduct).reduce((acc, itm) => {

 })

  img.value =
  discription.value =
  price.value =
  category.value =
  title.value =
  count.value =


return {
  img,
  discription,
  price,
  category,
  title,
  count,
  iError,
  tError,
  dError,
  cError,
  pError,
  cntError,
  iBlur,
  tBlur,
  dBlur,
  cBlur,
  pBlur,
  cntBlur,

}
}