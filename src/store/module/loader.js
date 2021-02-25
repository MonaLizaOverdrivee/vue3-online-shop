export default {
  namespaced: true,
  state() {
    return {
      loaderVisible: false,
      loaderButton: false
    };
  },
  getters: {
    loaderVisible: ({ loaderVisible }) => loaderVisible,
    loaderButton: ({ loaderButton }) => loaderButton
  },
  mutations: {
    TOGGLE_LOADER_VISIBLE(state, bool) {
      state.loaderVisible = bool;
    },
    TOGGLE_LOADER_BUTTON(state, bool) {
      state.loaderButton = bool;
    }
  }
};
