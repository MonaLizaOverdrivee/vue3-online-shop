<template>
  <TheHeader />
  <div class="p-grid p-jc-center">
    <div class="p-col  main-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader";
export default {
  components: { TheHeader }
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