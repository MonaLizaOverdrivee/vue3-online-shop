import * as yup from "yup";
import { useField, useForm, useFormValues } from "vee-validate";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export function useModal(category, emit) {
  const currentCategories = ref(null);
  const store = useStore();
  const schema = yup.object({
    title: yup.string().required("Укажите наименование категории"),
    type: yup.string().required("Укажите системное имя категории")
  });

  const { handleSubmit } = useForm({
    validationSchema: schema
  });

  const { value: type, errorMessage: tpError, handleBlur: tpBlur } = useField(
    "type"
  );
  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    "title"
  );

  watch(category, () => {
    type.value = category.category.type;
    title.value = category.category.title;
    currentCategories.value = {
      type: category.category.type,
      title: category.category.title
    };
  });

  const newCategories = useFormValues();

  const checkChangeData = computed(() =>
    Object.keys(currentCategories.value).reduce((acc, itm) => {
      return currentCategories.value[itm] === newCategories.value[itm] && acc;
    }, true)
  );

  function hide() {
    emit("checkChange", checkChangeData.value);
  }
  const save = handleSubmit(async fieldData => {
    await store.dispatch("shop/requestNewProduct", {
      ...fieldData,
      id: category.category.id
    });
    emit("hide");
  });

  return {
    hide,
    save,
    type,
    title,
    tError,
    tpError,
    tpBlur,
    tBlur
  };
}
