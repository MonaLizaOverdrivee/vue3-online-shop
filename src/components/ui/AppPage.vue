<template>
  <div class="p-grid">
    <div class="p-col"><h1 v-text="$route.meta.title"></h1></div>
  </div>
  <slot />
</template>

<script>
export default {
  mounted() {
    document.title = this.$route.meta.title;
  }
};
</script>

<style></style>
