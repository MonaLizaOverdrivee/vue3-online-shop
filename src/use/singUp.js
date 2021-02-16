import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useSignUp() {
  const router = useRouter();
  const store = useStore();
  const schema = yup.object({
    name: yup.string().trim().required("Это обязательное поле"),
    email: yup.string().trim().required("Это обязательное поле").email("Введите корректный email"),
    password: yup.string().trim().required("Это обязательное поле")
  })
  const { handleSubmit } = useForm({
		validationSchema: schema,
	});
  const { value: name, errorMessage: nError, handleBlur: nBlur } = useField('name', )
  const { value: email, errorMessage: lError, handleBlur: lBlur } = useField("email");
  const { value: pass, errorMessage: pError, handleBlur: pBlur } = useField("password");

  const onSubmit = handleSubmit(async (data, { resetForm }) => {
    try {
      await store.dispatch("auth/signUp", data);
      await router.push('/singnupdone')
    } catch (e) {
      console.log(e);
    }
    resetForm();
  });
  return {
    name,
    nError,
    nBlur,
    email,
    pass,
    lError,
    pError,
    lBlur,
    pBlur,
    onSubmit
  };
}
