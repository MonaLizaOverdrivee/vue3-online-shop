<template>
  <AppPage>
    <TabView>
      <TabPanel>
        <template #header>
          <i class="pi pi-user"></i>
          <span class="title-tab">Инфо</span>
        </template>
       <UserInfo :data="userInfo"/>
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="pi pi-inbox"></i>
          <span class="title-tab">Заказы</span>
        </template>
       <UserOrder :data="orderInfo" v-if="orderInfo.length"/>
       <p class="p-text-center" v-else>Вы не сделали еще ни одного заказа</p>
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="pi pi-cog"></i>
          <span class="title-tab">Настройки</span>
        </template>
       <UserOptions />
      </TabPanel>
    </TabView>
  </AppPage>
</template>

<script>
import AppPage from "../components/ui/AppPage";
import UserInfo from "../components/user/UserInfo";
import UserOptions from "../components/user/UserOptions";
import UserOrder from "../components/user/UserOrder";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  setup() {
    const store = useStore();
    onMounted(async () => await store.dispatch('order/getOrders'))
    const userInfo = computed(() => store.getters["auth/userName"]);
    const orderInfo = computed(() => {
      const arr = store.getters["order/orderUser"]
      return arr ? arr.sort((a, b) => b.time - a.time) : []
      });
    console.log(orderInfo.value);
    return {
      userInfo,
      orderInfo
    };
  },
  components: { AppPage, TabView, TabPanel, UserInfo, UserOptions, UserOrder },
};
</script>

<style scoped>
.title-tab {
  margin-left: 5px;
}
</style>
