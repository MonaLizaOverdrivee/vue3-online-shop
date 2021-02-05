import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      token: sessionStorage.getItem("userToken")
    };
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      sessionStorage.setItem("userToken", token);
    }
  },
  actions: {
    async login({ commit }, dataForm) {
      const {
        data
      } = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`,
        { ...dataForm, returnSecureToken: true }
      );
      commit("setToken", data.idToken);
    }
  }
};
