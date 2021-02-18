export default {
  namespaced: true,
  state() {
    return {
      cart: {}
    };
  },
  getters: {
    cart: ({ cart }) =>
      Object.keys(cart).map(itm => ({ id: itm, ...cart[itm] })),
    quantityProductsInCart: ({ cart }) => Object.keys(cart).length
  },
  mutations: {
    ADD_TO_CART(state, payload) {
      state.cart[payload.id] = payload;
      localStorage.setItem("userCart", JSON.stringify(state.cart));
    },
    SET_CART(state, payload) {
      state.cart[payload.id].quantity = payload.quantity;
      if (state.cart[payload.id].quantity === 0) delete state.cart[payload.id];
      localStorage.setItem("userCart", JSON.stringify(state.cart));
    },
    SET_PRODUCTS(state, products) {
      state.cart = products;
    },
    REMOVE_PRODUCTS(state, id) {
      delete state.cart[id];
      localStorage.setItem("userCart", JSON.stringify(state.cart));
    }
  },
  actions: {
    getProductsForCart({ commit }) {
      const result = JSON.parse(localStorage.getItem("userCart")) ?? {};
      commit("SET_PRODUCTS", result);
    }
  }
};
