import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

export function useFormLogin() {
  let invalidSubmitMessage = ref("");
  const router = useRouter();
  const store = useStore();
  const { handleSubmit } = useForm();
  const { value: email, errorMessage: lError, handleBlur: lBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Это обязательное поле")
      .email("Введите корректный email")
  );
  const { value: pass, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Это обязательное поле")
  );
  const onSubmit = handleSubmit(async (data, { resetForm }) => {
    try {
      await store.dispatch("auth/login", data).then(() => {
        if (store.getters["auth/userRole"] === "admin") router.push("/admin");
        if (store.getters["auth/userRole"] !== "admin") router.push("/");
        if (router.currentRoute.value.path !== "/auth")
          store.commit("TOGGLE_VISIBLE");
      });
    } catch {
      invalidSubmitMessage.value = "Пароль или логин введены неверно";
    }
    resetForm();
  });
  return {
    email,
    pass,
    lError,
    pError,
    lBlur,
    pBlur,
    onSubmit,
    invalidSubmitMessage
  };
}
