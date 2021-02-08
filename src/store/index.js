import { createStore } from "vuex";
import cart from "./module/cart";
import shop from "./module/shop";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    shop
  }
});
