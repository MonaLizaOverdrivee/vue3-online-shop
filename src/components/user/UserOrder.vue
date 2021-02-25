<template>
  <Panel v-for="itm in data" :key="itm.nameOrder" class="p-mb-3">
    <template #header>
      <div>
        <span class="header-info"
          >Заказ от
          {{
            new Date(itm.time).getDate() +
              " " +
              monthName[new Date(itm.time).getMonth()]
          }}</span
        ><br />
        <small
          ><i
            ><a href="#">{{ itm.nameOrder }}</a></i
          ></small
        >
      </div>
    </template>
    <template #icons>
      <span class="header-info">{{ itm.price }} руб.</span>
    </template>
    <div class="p-d-flex p-jc-between">
      <div><strong>Статус:</strong> В обработке</div>
      <div>
        <img
          v-for="prod in itm.products"
          :key="prod"
          :src="prod.img"
          alt=""
          class="order-product-img"
          @click="$router.push(`/product/${prod.id}`)"
        />
      </div>
    </div>
  </Panel>
</template>

<script>
import Panel from "primevue/panel";
//new Date(itm.time).getDate()
export default {
  props: ["data"],
  data() {
    return {
      monthName: [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
      ]
    };
  },
  components: { Panel }
};
</script>

<style scoped>
.order-product-img {
  max-width: 100px;
  margin: 0 5px;
  cursor: pointer;
}
.header-info {
  font-weight: 800;
  font-size: 15pt;
}
</style>
