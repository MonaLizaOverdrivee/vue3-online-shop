import { createStore } from "vuex";
import cart from "./module/cart";
import shop from "./module/shop";
import auth from "./module/auth";

export default createStore({
  state(){
    return {
      visibleAuthModal: false
    }
  },
  mutations: {
    TOGGLE_VISIBLE(state){
      state.visibleAuthModal = !state.visibleAuthModal
    }
  },
  actions: {},
  modules: {
    cart,
    shop,
    auth
  }
});
