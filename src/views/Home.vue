<template>
  <div class="p-grid">
    <div class="p-col-12"></div>
    <div
      class="p-col-2"
      v-for="cat in categories"
      :key="cat.id"
      @click="$router.push(`/shop?category=${cat.type}`)"
    >
      <div
        class="card p-d-flex p-flex-column p-jc-end p-shadow-9"
        :style="'background-color: ' + randomColor()"
      >
        <img :src="cat.image" alt="" class="img-cat" />
        <div>
          <h3 class="title-cat">{{ cat.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    randomNumber() {
      return Math.round(Math.random() * 255);
    },
    randomColor() {
      return `rgb(${this.randomNumber()}, ${this.randomNumber()}, ${this.randomNumber()}, 0.7)`;
    }
  },
  computed: {
    ...mapGetters("shop", ["categories"])
  }
};
</script>

<style scoped>
.img-cat {
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  transition: all 0.4s linear;
}
.title-cat {
  background: #fff;
  display: inline-block;
  padding: 0 0.5rem 0 1rem;
  border-radius: 0 8px 8px 0;
}
.card {
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}
.card:hover .img-cat {
  transform: scale(1.5);
}
</style>
