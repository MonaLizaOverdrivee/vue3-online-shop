<template>
  <ProgressBar mode="indeterminate" style="height: .5em" v-if="dataLoad" />
  <TheHeader />
  <div class="p-grid p-jc-center p-mt-3" v-if="!dataLoad">
    <div class="p-col  main-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import ProgressBar from "primevue/progressbar";
import TheHeader from "../components/TheHeader";
export default {
  computed: {
    dataLoad() {
      return this.$store.getters["loader/loaderVisible"];
    }
  },
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
