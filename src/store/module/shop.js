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
    },
    ADD_NEW_CATEGORIES(state, newCat) {
      state.categories[newCat.id] = newCat;
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
    },
    async requestEditProduct({commit}, product){
      await requestToDatabase.patch(`/products/${product.id}.json`, product)
      commit("ADD_NEW_PRODUCT", product);
    },
    async removeProducts({commit}, products){
      const request = products.map(itm => requestToDatabase.delete(`/products/${itm.id}.json`))
      await Promise.all(request)
      commit('REMOVE_PRODUCT',products)
    },

    async requestNewCategory({ commit }, category) {
      const { data } = await requestToDatabase.post("/categories.json", category);
      commit("ADD_NEW_CATEGORIES", { ...category, id: data.name });
    },
    async requestEditCategory({ commit }, category){
      await requestToDatabase.patch(`/categories/${category.id}.json`, category)
      commit("ADD_NEW_CATEGORIES", category);
    },
    async requestRemoveCategory({commit}, category){
      const request = category.map(itm => requestToDatabase.delete(`/categories/${itm.id}.json`))
      await Promise.all(request)
      commit('REMOVE_CATEGORIES', category)
    }
  }

};
