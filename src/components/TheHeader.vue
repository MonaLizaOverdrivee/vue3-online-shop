<template>
  <Menubar :model="items" style="z-index: 999">
    <template #start>
      <h2 class="p-mt-0 p-mb-1">OnlineShop |</h2>
    </template>
    <pre>{{ auth }}</pre>
    <template #end>
      <Button
        :label="$store.getters['auth/userName']"
        class="p-button-secondary p-button-text"
        v-if="auth"
      />
      <Button
        label="Выход"
        class="p-button-secondary p-button-text"
        icon="pi pi-sign-out"
        @click="logOut"
        v-if="auth"
      />
      <Button
        label="Войти"
        class="p-button-secondary p-button-text"
        icon="pi pi-sign-in"
        @click="$store.commit('TOGGLE_VISIBLE')"
        v-else
      />
      <router-link to="/cart"
        ><i
          class="pi pi-shopping-cart p-mr-4 p-text-secondary"
          style="font-size: 1.9rem"
          v-badge="`${$store.getters['cart/quantityProductsInCart']}`"
          to="/cart"
        ></i
      ></router-link>
    </template>
  </Menubar>
  <Dialog
    header=" "
    dismissableMask
    v-model:visible="$store.state['visibleAuthModal']"
    :style="{ width: '450px' }"
    :modal="true"
    class="p-fluid"
  >
    <Auth />
  </Dialog>
  <Dialog
    header="Приветствую Владилен!"
    dismissableMask
    v-model:visible="modalQustions"
    :style="{ width: '60%' }"
    :modal="true"
    class="p-fluid"
  >
    <p>
      <strong>Пожелания:</strong> Полазить по приложению, пощелкать, посмотреть
      какой функционал можно добавить, что улучшить
    </p>
    <p>
      <strong>Вопросы:</strong> <br />
      <i>Вопрос 1:</i> Можно ли следить за изменениями local и session storage.
      У меня не с помощью computed не getters не отслеживали изменения
      динамически.
    </p>
    <p>
      <i>Вопрос 2:</i> Как сделать автологин по данным из localStorage? я
      пробывал в хуке роутера .beforeEach но так как запрос на сервер для
      подтверждения асинхроный, то сначала выполняется тело хука, а потом уже
      приходят данные из асинхронного запроса. И допустим сразу зайти на
      страницу /admin не получется.
    </p>
    <p>
      <i>Вопрос 3:</i> Почему не работает роут /:notFound(.*) и как эта
      конструкция взаимодействует с хуками переходов роутера
    </p>
    <p>
      <strong>Примичания:</strong> Ещё не добавил уведомления; логика запросов
      из админки не доработана и работает не корректно, успешно можно только
      добавить в базу новый продукт
    </p>
  </Dialog>
</template>

<script>
import Auth from "../views/Auth";
import Dialog from "primevue/dialog";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import BadgeDirective from "primevue/badgedirective";
// import Button from "primevue/button";
export default {
  data() {
    return {
      visibility: false,
      modalQustions: false,
      items: [
        {
          label: "Магазин",
          to: "/"
        },
        {
          label: "Вопросы",
          command: () => (this.modalQustions = true)
        }
      ]
    };
  },
  computed: {
    auth() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logOut");
      this.$router.push("/");
    }
  },
  directives: {
    badge: BadgeDirective
  },
  components: { Menubar, Button, Dialog, Auth }
};
</script>

<style scoped>
.p-menubar {
  position: sticky;
  top: 0;
  border: 0 !important;
  padding: 0.7rem !important;
  box-shadow: 0px 3px 4px -1px;
}
</style>
