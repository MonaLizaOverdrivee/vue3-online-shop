<template>
   <ProgressBar mode="indeterminate" style="height: .5em" v-if="$store.getters['loader/loaderVisible']"/>
  <TheHeader />
  <div class="p-grid p-jc-center" v-if="!$store.getters['loader/loaderVisible']">
    <div class="p-col  main-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import ProgressBar from 'primevue/progressbar';
import TheHeader from "../components/TheHeader";
export default {
  components: { TheHeader, ProgressBar }
};
</script>

<style>
.main-layout {
  max-width: 1500px;
}
.p-menubar {
  border: 0 !important;
  margin: 0 -8px;
}
</style>
