import requestCartProduct from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      products: []
    };
  },
  getters: {
    products: ({ products }) => products,
    quantityProductsInCart: ({ products }) => products.length
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    CHANGE_QUANTITY({ products }, value) {
      products.find(itm => itm.id === value.id).quantity = value.quantity;
    },
    REMOVE_PRODUCTS(state, id) {
      state.products = state.products.filter(itm => itm.id !== id);
      // const index = products.findIndex(itm => itm.id === id)
    }
  },
  actions: {
    async getProductsForCart({ commit }, dataCart) {
      const idProducts = Object.keys(dataCart)
        .map(itm => `id=${itm}`)
        .join("&");
      const { data } = await requestCartProduct.get(`products?${idProducts}`);
      const result = data.map(itm => ({ quantity: dataCart[itm.id], ...itm }));
      commit("SET_PRODUCTS", result);
    },
    async removeProductsCart({ commit }, id) {
      //отправка запроса на удаление в бд
      commit("REMOVE_PRODUCTS", id);
    }
  }
};
