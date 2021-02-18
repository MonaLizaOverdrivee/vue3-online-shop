<template>
  <div class="p-grid">
    <div class="p-col-2">
      <div class="card p-d-flex p-flex-column p-jc-end " :style="'background-color: ' + randomColor()">
      <img src="https://www.agroxxi.ru/images/photos/medium/article87272.jpg" alt="" class="img-cat">
      <h2 class="p-ml-2">Фрукты</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
methods: {
  randomNumber() {
    return Math.round(Math.random() * 255)
  },
  randomColor() {
    return `rgb(${this.randomNumber()}, ${this.randomNumber()}, ${this.randomNumber()}, 0.7)`
  }
}
}
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
}
.card {
  position: relative;
 height: 200px;
  border-radius: 8px;
}
</style>