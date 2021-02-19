<template>
  <AppPage>
   <div class="p-grid">
     <pre>{{ userInfo }}</pre>
     <pre>{{ orderInfo }}</pre>
   </div>
  </AppPage>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
setup() {
  const store = useStore();
  const userInfo = computed(() => store.getters['auth/userName'])
  const orderInfo = computed(() => store.getters['cart/order'])
  console.log(userInfo.value)
  return{
    userInfo,
    orderInfo
  }
},
components: { AppPage }
}
</script>

<style>

</style>