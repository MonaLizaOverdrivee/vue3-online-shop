import { createStore } from "vuex";
import cart from "./module/cart";
import shop from "./module/shop";
import auth from "./module/auth";
import order from "./module/order";
import loader from "./module/loader";

export default createStore({
  state() {
    return {
      visibleAuthModal: false,
      visibleVladModal: false
    };
  },
  mutations: {
    TOGGLE_VISIBLE(state) {
      state.visibleAuthModal = !state.visibleAuthModal;
    },
    TOGGLE_VISIBLE_VLAD(state) {
      state.visibleVladModal = !state.visibleVladModal;
    }
  },
  actions: {
    async getAppData({ dispatch, commit }) {
      try {
        commit("loader/TOGGLE_LOADER_VISIBLE", true);
        await dispatch("cart/getProductsForCart");
        await dispatch("shop/getAllProducts");
        await dispatch("shop/getCategories");
        // if(getters['auth/isAuthenticated']) await dispatch('order/getOrders')
        commit("loader/TOGGLE_LOADER_VISIBLE", false);
      } catch (error) {
        console.dir(error);
      }
    }
  },
  modules: {
    cart,
    shop,
    auth,
    loader,
    order
  }
});
