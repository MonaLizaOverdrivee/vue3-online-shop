import { requestToDatabase } from "../../axios/request";
export default {
  namespaced: true,
  state() {
    return {
      cart: {},
      order: {},
      orderUser: {}
    };
  },
  getters: {
    cart: ({ cart }) =>
      Object.keys(cart).map(itm => ({ id: itm, ...cart[itm] })),
    quantityProductsInCart: ({ cart }) => Object.keys(cart).length,
    order: ({ order }) => order,
    orderUser: ({ orderUser }) => Object.keys(orderUser).map(itm => ({nameOrder: itm, ...orderUser[itm]}))
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
      state.order[payload.id] =  payload.data
    },
    CLEAR_CART(state){
      state.cart = {}
      localStorage.removeItem("userCart")
    },
    ADD_TO_USER_ORDER(state, payload){
      state.orderUser = payload
    }
  },
  actions: {
    getProductsForCart({ commit }) {
      const result = JSON.parse(localStorage.getItem("userCart")) ?? {};
      commit("SET_PRODUCTS", result);
    },
    async getOrders({rootState, commit}) {
      const userId = rootState.auth.user.id
      const { data } = await requestToDatabase.get(`/users/${userId}/orderlist.json`)
      const request = Object.keys(data).map(itm => requestToDatabase.get(`/orders/${itm}.json`))
      const response = await Promise.all(request)
      console.log(request)
      const responseSerialize = response.reduce((acc, itm) => {
        const product = itm.data.products
        const products = Object.keys(product).map(itm => ({id: itm, ...product[itm]}))
        acc[itm.data.orderNumber] = {
          price: itm.data.price,
          products: products,
          time: itm.data.time,
        }
        //Object.keys(itm.data.products).map(itm => ({id: itm, ...itm.data.products}))
        return acc
      }, {})
      console.log(responseSerialize)
      commit('ADD_TO_USER_ORDER', responseSerialize)

    },
    async setOrderList({ state, commit, rootState }, total){
      try {
        const orderNumber = 'O' + Math.round(Math.random() * 1000000) + '-' + new Date().getYear() + '' +new Date().getDate()
        const userId = rootState.auth.user.id
        const products = Object.keys(state.cart).reduce((acc, itm) => {
          acc[itm] = {
            quantity: state.cart[itm].quantity,
            price: state.cart[itm].price,
            title: state.cart[itm].title,
            img: state.cart[itm].img
          }
          return acc
        },{})
        const orderInfo = {
          time: Date.now(),
          userId: userId,
          price: total,
          products: products,
          orderNumber: orderNumber
        }
        console.log('order', orderInfo)
        console.log(commit, requestToDatabase)
        const { data } = await requestToDatabase.post('/orders.json', orderInfo)
        await requestToDatabase.put(`/users/${userId}/orderlist/${data.name}.json`, {id: data.name})
        commit('ADD_TO_ORDER', { data: {...orderInfo}, id: data.name })
        commit('CLEAR_CART')
      } catch (e) {
        console.log(e.response)
      }
    }
  }
};
