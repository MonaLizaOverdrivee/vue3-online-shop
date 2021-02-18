import * as yup from "yup";
import { useField, useForm, useFormValues } from "vee-validate";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export function useModal(product, emit) {
  const currentProduct = ref(null);
  const store = useStore();
  const schema = yup.object({
    title: yup.string().required("Укажите наименование товара"),
    category: yup.string().required("Выбирете категорию"),
    price: yup.number().required("Укажите цену товара за шт."),
    count: yup.number().required("Укажите количество товаров")
  });

  const { handleSubmit } = useForm({
    validationSchema: schema
  });

  const { value: img, handleBlur: iBlur } = useField("img");
  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    "title"
  );
  const { value: discription, handleBlur: dBlur } = useField("discription");
  const { value: category, errorMessage: cError, handleBlur: cBlur } = useField(
    "category"
  );
  const { value: price, errorMessage: pError, handleBlur: pBlur } = useField(
    "price"
  );
  const {
    value: count,
    errorMessage: cntError,
    handleBlur: cntBlur
  } = useField("count");

  watch(product, () => {
    (img.value = product.product.img),
      (discription.value = product.product.discription);
    price.value = product.product.price;
    category.value = product.product.category;
    title.value = product.product.title;
    count.value = product.product.count;
    currentProduct.value = {
      discription: undefined,
      img: product.product.img,
      price: product.product.price,
      category: product.product.category,
      title: product.product.title,
      count: product.product.count
    };
  });

  const newProduct = useFormValues();

  const checkChangeData = computed(() =>
    Object.keys(currentProduct.value).reduce((acc, itm) => {
      return currentProduct.value[itm] === newProduct.value[itm] && acc;
    }, true)
  );

  function hide() {
    emit("checkChange", checkChangeData.value);
  }
  const save = handleSubmit(async fieldData => {
    await store.dispatch("shop/requestEditProduct", {
      ...fieldData,
      id: product.product.id
    });
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
