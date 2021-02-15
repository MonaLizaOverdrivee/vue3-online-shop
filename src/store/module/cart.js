
export default {
  namespaced: true,
  state() {
    return {
      products: []
    };
  },
  getters: {
    products: ({ products }) => Object.keys(products).map(itm => ({id: itm, ...products[itm]})),
    quantityProductsInCart: ({ products }) => Object.keys(products).length
  },
  mutations: {
    ADD_TO_CART(state, payload){
      state.products[payload.id] = payload
      localStorage.setItem('userCart', JSON.stringify(state.products))
    },
    SET_CART(state, payload) {
      state.products[payload.id].quantity = payload.quantity
      if(state.products[payload.id].quantity === 0) delete state.products[payload.id]
      
      localStorage.setItem('userCart', JSON.stringify(state.products))
      console.log(' SET_CART', payload.quantity)
      
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    REMOVE_PRODUCTS(state, id) {
      delete state.products[id]
      localStorage.setItem('userCart', JSON.stringify(state.products))
    }
  },
  actions: {
    getProductsForCart({ commit }) {
      const result = localStorage.getItem('userCart') !== null ? JSON.parse(localStorage.getItem('userCart')) : {}
      commit("SET_PRODUCTS", result);
    }
  }
};
