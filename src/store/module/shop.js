import requestToDatabase from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      products: {},
      selectedProduct: {},
      categories: []
    };
  },
  getters: {
    products: ({ products }) => Object.keys(products).map(itm => products[itm]),
    categories: ({ categories }) => categories,
    selectedProduct: ({ selectedProduct }) => selectedProduct
    //
  },
  mutations: {
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product;
    },
    SET_COUNT(state, payload) {
      state.products[payload.id].count = payload.count;
    },
    SET_PRODUCTS(state, data) {
      state.products = data;
    },
    REMOVE_PRODUCT(state, products) {
      products.forEach(itm => delete state.products[itm.id]);
    },
    SET_CATEGORIES(state, category) {
      state.categories = category;
    },
    ADD_NEW_PRODUCT(state, newProd) {
      newProd.id = Math.round(Math.random() * 1000);
      state.products[newProd.id] = newProd;
    },
    EDIT_PRODUCT(state, product){
      state.products[product.id] = product
    }
  },
  actions: {
    async getAllProducts({ commit }) {
      const { data } = await requestToDatabase.get("/products");
      const dataObject = data.reduce((acc, itm) => {
        acc[itm.id] = itm;
        return acc;
      }, {});
      commit("SET_PRODUCTS", dataObject);
    },
    async getSelectedProduct({ commit }, id) {
      try {
        const { data } = await requestToDatabase.get(`/products?id=${id}`);
        commit("SET_SELECTED_PRODUCT", data[0]);
      } catch (e) {
        console.log(e);
      }
    },
    async getCategories({ commit }) {
      const { data } = await requestToDatabase.get("/categories");

      commit("SET_CATEGORIES", data);
    },
    async requestNewProduct({ commit }, product) {
      //Запрос на добавление/изменение
      commit("ADD_NEW_PRODUCT", product);
      console.log(product)
    },
    async requestToChangeProduct({ commit}, product){
      //request to server

      commit('EDIT_PRODUCT', product)
    }
  }

  // async getFilterProducts({ commit }, category){
  //   const { data } = await requestToDatabase.get(`/products?category=${category}`);
  //     commit("SET_PRODUCTS", data);
  // }
  //Такой варинт как мне кажется более производительный, потому что нам не нужно загружать всю базу продуктов, я использовал вариант
  // с фильтром в компоненте в связи с тем что для решения задачи нужно отслеживать кол во продуктов на складе а при фильтрации категории через запрос к бд колво товаров обновляется
};
