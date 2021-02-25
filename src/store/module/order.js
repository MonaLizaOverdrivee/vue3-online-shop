import { requestToDatabase } from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      order: {},
      userOrder: {}
    };
  },
  getters: {
    order: ({ order }) =>
      Object.keys(order).map(itm => ({ id: itm, ...order[itm] })),
    orderUser: ({ orderUser }) =>
      orderUser
        ? Object.keys(orderUser).map(itm => ({
            nameOrder: itm,
            ...orderUser[itm]
          }))
        : []
  },
  mutations: {
    ADD_TO_ORDER(state, payload) {
      state.order[payload.id] = payload.data;
    },
    ADD_ALL_ORDERS(state, payload) {
      state.order = payload;
    },
    ADD_TO_USER_ORDER(state, payload) {
      state.orderUser = payload;
    }
  },
  actions: {
    async getAllOrders({ commit }) {
      const { data } = await requestToDatabase.get("/orders.json");
      commit("ADD_ALL_ORDERS", data);
    },
    async getOrders({ rootState, commit }) {
      const userId = rootState.auth.user.id;
      const { data } = await requestToDatabase.get(
        `/users/${userId}/orderlist.json`
      );
      const request = Object.keys(data).map(itm =>
        requestToDatabase.get(`/orders/${itm}.json`)
      );
      const response = await Promise.all(request);
      const responseSerialize = response.reduce((acc, itm) => {
        const product = itm.data.products;
        const products = Object.keys(product).map(itm => ({
          id: itm,
          ...product[itm]
        }));
        acc[itm.data.orderNumber] = {
          price: itm.data.price,
          products: products,
          time: itm.data.time
        };
        return acc;
      }, {});
      commit("ADD_TO_USER_ORDER", responseSerialize);
    },
    async setOrderList({ commit, rootState }, total) {
      try {
        const orderNumber =
          "O" +
          Math.round(Math.random() * 1000000) +
          "-" +
          new Date().getYear() +
          "" +
          new Date().getDate();
        const userId = rootState.auth.user.id;
        const cart = rootState.cart.cart;
        const products = Object.keys(cart).reduce((acc, itm) => {
          acc[itm] = {
            quantity: cart[itm].quantity,
            price: cart[itm].price,
            title: cart[itm].title,
            img: cart[itm].img
          };
          return acc;
        }, {});
        const orderInfo = {
          time: Date.now(),
          userId: userId,
          price: total,
          products: products,
          orderNumber: orderNumber
        };
        const { data } = await requestToDatabase.post(
          "/orders.json",
          orderInfo
        );
        await requestToDatabase.put(
          `/users/${userId}/orderlist/${data.name}.json`,
          { id: data.name }
        );
        commit("ADD_TO_ORDER", { data: { ...orderInfo }, id: data.name });
        commit("CLEAR_CART");
      } catch (e) {
        console.log(e.response);
      }
    }
  }
};
