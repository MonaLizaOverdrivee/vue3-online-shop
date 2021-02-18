import * as yup from "yup";
import { useField, useForm, useFormValues, useResetForm } from "vee-validate";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useConfirm } from "primevue/useconfirm";

export function useModalNew(emit) {
  const confirm = useConfirm();
  const currentProduct = ref({
    discription: undefined,
    img: undefined,
    price: undefined,
    category: undefined,
    title: undefined,
    count: undefined
  });
  const store = useStore();
  const schema = yup.object({
    title: yup.string().trim().required("Укажите наименование товара"),
    category: yup.string().required("Выбирете категорию"),
    price: yup.number().required("Укажите цену товара за шт."),
    count: yup.number().required("Укажите количество товаров")
  });

  const { handleSubmit } = useForm({
    validationSchema: schema
  });

  const { value: img, handleBlur: iBlur } = useField("img");
  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField("title");
  const { value: discription, handleBlur: dBlur } = useField("discription");
  const { value: category, errorMessage: cError, handleBlur: cBlur } = useField("category");
  const { value: price, errorMessage: pError, handleBlur: pBlur } = useField("price");
  const { value: count, errorMessage: cntError, handleBlur: cntBlur } = useField("count");


  const newProduct = useFormValues();
  const reset = useResetForm()

  const checkChangeData = computed(() =>
    Object.keys(currentProduct.value).reduce((acc, itm) => {
      return currentProduct.value[itm] === newProduct.value[itm] && acc;
    }, true)
  );

  function hide() {
    if (!checkChangeData.value) {
      confirm.require({
        acceptLabel: "Да",
        rejectLabel: "Нет",
        message: "Есть несохранённые данные, всё равно закрыть?",
        header: "Подтвердите действие",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          reset()
          emit("hide");
        }
      });
    } else {
      emit("hide");
    }
  }
  const save = handleSubmit(async (fieldData, { resetForm }) => {
    await store.dispatch("shop/requestNewProduct", {
      ...fieldData
    });
    resetForm()
    emit("hide");
  });

  return {
    hide,
    save,
    img,
    discription,
    price,
    category,
    title,
    count,
    tError,
    cError,
    pError,
    cntError,
    iBlur,
    tBlur,
    dBlur,
    cBlur,
    pBlur,
    cntBlur
  };
}
