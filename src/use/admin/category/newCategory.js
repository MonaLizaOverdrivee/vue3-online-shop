import * as yup from "yup";
import { useField, useForm, useFormValues, useResetForm } from "vee-validate";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useConfirm } from "primevue/useconfirm";

export function useModalNew(emit) {
  const confirm = useConfirm();
  const currentCategories = ref({
    type: undefined,
    title: undefined
  });
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

  const newCategories = useFormValues();
  const reset = useResetForm();

  const checkChangeData = computed(() =>
    Object.keys(currentCategories.value).reduce((acc, itm) => {
      return currentCategories.value[itm] === newCategories.value[itm] && acc;
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
          reset();
          emit("hide");
        }
      });
    } else {
      emit("hide");
    }
  }
  const save = handleSubmit(async (fieldData, { resetForm }) => {
    await store.dispatch("shop/requestNewCategory", fieldData);
    resetForm();
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
