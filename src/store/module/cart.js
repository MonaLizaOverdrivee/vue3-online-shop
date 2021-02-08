import requestToDatabase from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      cart: {
        "19": 4,
      "20": 3,
      "15": 7,
      "11": 1
      }
    };
  },
  getters: {
    products: ({ products }) => products,
    quantityProductsInCart: ({ cart }) => Object.keys(cart).length,
    cart: ({ cart }) => cart
  },
  mutations: {
    SET_CART(state, payload){
      state.cart[payload.id] = state.cart[payload.id] ? payload.quantity :  1
      if(state.cart[payload.id] === 0)  delete state.cart[payload.id]
      console.log(state.cart)
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    CHANGE_QUANTITY(state, value) {
      const index = state.cart.findIndex(itm => itm.id === value.id)
      state.cart[index].quantity = value.quantity;
      state.cart[value.id] = value.quantity
    },
    REMOVE_PRODUCTS(state, id) {
      state.products = state.products.filter(itm => itm.id !== id);
      delete state.cart[id]
      // const index = products.findIndex(itm => itm.id === id)
    }
  },
  actions: {
    async getProductsForCart({ state, commit }) {
      console.log(state.cart)
      const idProducts = Object.keys(state.cart)
        .map(itm => `id=${itm}`)
        .join("&");
      const { data } = await requestToDatabase.get(`products?${idProducts}`);
      const result = data.map(itm => ({ quantity: state.cart[itm.id], ...itm }));
      commit("SET_PRODUCTS", result);
    },
    async removeProductsCart({ commit }, id) {
      //отправка запроса на удаление в бд
      commit("REMOVE_PRODUCTS", id);
    }
  }
};
