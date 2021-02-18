<template>
  <h1 class="p-text-center">Вход в систему</h1>
  <form class="p-fluid p-input-filled" @submit.prevent="onSubmit">
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
    <AppLoaderButton />
    <Button
      label="Зрегистрироваться"
      class="p-button-text"
      @click="$router.push('/singup')"
    />
    <div class="p-text-center">
      <small class="p-error" v-if="invalidSubmitMessage">{{
        invalidSubmitMessage
      }}</small>
    </div>
  </form>
</template>

<script>
import { useFormLogin } from "../use/login";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import AppLoaderButton from '../components/ui/AppLoaderButton'

export default {
  setup() {
    return { ...useFormLogin() };
  },
  components: { InputText, Button, AppLoaderButton }
};
</script>
