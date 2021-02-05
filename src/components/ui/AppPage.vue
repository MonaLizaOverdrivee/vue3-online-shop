<template>
  <div class="p-grid">
    <div class="p-col"><h1 v-text="$route.name"></h1></div>
  </div>
  <slot />
</template>

<script>
export default {
  mounted() {
    document.title = this.$route.name;
  }
};
</script>

<style></style>
