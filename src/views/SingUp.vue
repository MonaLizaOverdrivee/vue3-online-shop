<template>
   <h1 class="p-text-center">Регистрация</h1>
  <form class="p-fluid p-input-filled" @submit.prevent="onSubmit">
     <div class="p-field">
      <label for="name">Имя</label>
      <InputText
        id="name"
        type="text"
        v-model="name"
        aria-describedby="name-help"
        :class="{ 'p-invalid': nError }"
        @blur="nBlur"
      />
      <small id="name-help" class="p-error">{{ nError }}</small>
    </div>
    <div class="p-field">
      <label for="login">Email</label>
      <InputText
        id="login"
        type="email"
        v-model="email"
        aria-describedby="login-help"
        :class="{ 'p-invalid': lError }"
        @blur="lBlur"
      />
      <small id="login-help" class="p-error">{{ lError }}</small>
    </div>
    <div class="p-field">
      <label for="password">Пароль</label>
      <InputText
        id="password"
        type="password"
        v-model="pass"
        :class="{ 'p-invalid': pError }"
        @blur="pBlur"
      />
      <small id="password-help" class="p-error">{{ pError }}</small>
    </div>
    <Button label="Войти" type="submit" />
  </form>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useSignUp } from '../use/singUp'
export default {
setup() {
  return {
    ...useSignUp()
  }
},
components: { InputText, Button }
}
</script>

<style>

</style>