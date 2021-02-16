<template>
  <TheHeaderAdmin />
  <div class="p-grid p-jc-center">
    <div class="p-col  main-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeaderAdmin from "../components/TheHeaderAdmin";
export default {
  components: { TheHeaderAdmin }
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
