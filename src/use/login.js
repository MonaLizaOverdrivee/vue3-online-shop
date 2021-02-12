import * as yup from "yup";
import { useField, useForm, useFormValues } from "vee-validate";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

export function useFormLogin() {
  let invalidSubmitMessage = ref("");
  const router = useRouter();
  const store = useStore();
  const { handleSubmit } = useForm();
  const values = useFormValues();
  console.log(values.value);
  const { value: login, errorMessage: lError, handleBlur: lBlur } = useField(
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
      await store.dispatch("auth/login", data);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
    // const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_API_KEY}`, {
    //   method: 'POST',
    //   'Content-Type':'aplication/json',
    //   body: JSON.stringify({...data, returnSecureToken: true})
    // })
    // const fbResp = await response.json()
    // if(fbResp.error){
    //   invalidSubmitMessage.value = 'Пароль или логин введены неверно'
    // } else{
    //    sessionStorage.setItem('usertoken', fbResp.idToken)
    //    router.push('/dashboard')
    // }
    resetForm();
  });
  return {
    login,
    pass,
    lError,
    pError,
    lBlur,
    pBlur,
    onSubmit,
    invalidSubmitMessage
  };
}
