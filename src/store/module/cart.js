import { requestToDatabase } from "../../axios/request";
export default {
  namespaced: true,
  state() {
    return {
      cart: {},
      order: {}
    };
  },
  getters: {
    cart: ({ cart }) =>
      Object.keys(cart).map(itm => ({ id: itm, ...cart[itm] })),
    quantityProductsInCart: ({ cart }) => Object.keys(cart).length,
    order: ({ order }) => order
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
    },
    ADD_TO_ORDER(state, payload){
      state.order[payload.id] =1
    },
    CLEAR_CART(state){
      state.cart = {}
      localStorage.removeItem("userCart")
    }
  },
  actions: {
    getProductsForCart({ commit }) {
      const result = JSON.parse(localStorage.getItem("userCart")) ?? {};
      commit("SET_PRODUCTS", result);
    },
    async getOrders() {
      // const { data } = await requestToDatabase.get('/orders.json')

    },
    async setOrderList({ state, commit, rootState }, total){
      console.log(rootState.auth.user.id)
      const products = Object.keys(state.cart).reduce((acc, itm) => {
        acc[itm] = {
          quantity: state.cart[itm].quantity,
          price: state.cart[itm].price,
          title: state.cart[itm].title
        }
        return acc
      },{})
      const orderInfo = {
        time: Date.now(),
        userId: rootState.auth.user.id,
        price: total,
        products: products
      }
      console.log('order', orderInfo)
      console.log(commit, requestToDatabase)
      const { data } = await requestToDatabase.post('/orders.json', orderInfo)
      commit('ADD_TO_ORDER', { data: {...orderInfo}, id: data.name })
      commit('CLEAR_CART')
    }
  }
};
