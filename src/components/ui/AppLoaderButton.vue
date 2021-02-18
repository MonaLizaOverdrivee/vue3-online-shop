<template>
   <Button :label="text" type="submit" :icon="icon"/>
</template>

<script>
import Button from "primevue/button";
export default {
  computed: {
    icon(){
      return this.$store.getters['loader/loaderButton'] ? 'pi pi-spin pi-spinner' : ''
    },
    text(){
      return this.$store.getters['loader/loaderButton'] ? '' : 'Войти'
    }
  },

components: { Button }
}
</script>

<style scoped>
.p-button {
  width: 100% !important;
}
</style>