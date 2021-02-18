import { requestToDatabase } from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      products: {},
      selectedProduct: {},
      categories: {}
    };
  },
  getters: {
    products: ({ products }) => Object.keys(products).map(itm => products[itm]),
    categories: ({ categories }) =>
      Object.keys(categories).map(itm => categories[itm]),
    selectedProduct: ({ selectedProduct }) => selectedProduct
    //
  },
  mutations: {
    SET_SELECTED_PRODUCT(state, id) {
      state.selectedProduct = state.products[id];
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
    REMOVE_CATEGORIES(state, category) {
      category.forEach(itm => delete state.categories[itm.id]);
    },
    ADD_NEW_PRODUCT(state, newProd) {
      state.products[newProd.id] = newProd;
    }
  },
  actions: {
    async getAllProducts({ commit }) {
      const { data } = await requestToDatabase.get("/products.json");
      for (let key in data) {
        data[key] = { id: key, ...data[key] };
      }
      commit("SET_PRODUCTS", data);
    },
    async getCategories({ commit }) {
      const { data } = await requestToDatabase.get("/categories.json");
      for (let key in data) {
        data[key] = { id: key, ...data[key] };
      }
      commit("SET_CATEGORIES", data);
    },
    async requestNewProduct({ commit }, product) {
      const { data } = await requestToDatabase.post("/products.json", product);
      commit("ADD_NEW_PRODUCT", { ...product, id: data.name });
    }
  }

  // async getFilterProducts({ commit }, category){
  //   const { data } = await requestToDatabase.get(`/products?category=${category}`);
  //     commit("SET_PRODUCTS", data);
  // }
  //Такой варинт как мне кажется более производительный, потому что нам не нужно загружать всю базу продуктов, я использовал вариант
  // с фильтром в компоненте в связи с тем что для решения задачи нужно отслеживать кол во продуктов на складе а при фильтрации категории через запрос к бд колво товаров обновляется
};
