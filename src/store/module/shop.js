import requestToDatabase from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      products: {},
      categories: []
    };
  },
  getters: {
    products: ({ products }) => Object.keys(products).map(itm => products[itm]),
    categories: ({ categories }) => categories
    //
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.products[payload.id].count = state.products[payload.id].count - payload.count;
      console.log(state.products[payload.id].count)
    },
    SET_PRODUCTS(state, data) {
      state.products = data;
    },
    SET_CATEGORIES(state, category) {
      state.categories = category;
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
    async getCategories({ commit }) {
      const { data } = await requestToDatabase.get("/categories");

      commit("SET_CATEGORIES", data);
    }
  }

  // async getFilterProducts({ commit }, category){
  //   const { data } = await requestToDatabase.get(`/products?category=${category}`);
  //     commit("SET_PRODUCTS", data);
  // }
  //Такой варинт как мне кажется более производительный, потому что нам не нужно загружать всю базу продуктов, я использовал вариант
  // с фильтром в компоненте в связи с тем что для решения задачи нужно отслеживать кол во продуктов на складе а при фильтрации категории через запрос к бд колво товаров обновляется
};
