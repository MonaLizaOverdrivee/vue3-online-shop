import { authInApp, requestToDatabase } from "@/axios/request";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem("TOKEN_KEY"),
      expiresDate: localStorage.getItem("EXPIRES_IN"),
      refreshToken: localStorage.getItem("REFRESH_TOKEN"),
      user: {
        id: "",
        role: "",
        name: sessionStorage.getItem("userName")
      }
    };
  },
  getters: {
    token:({ token }) => token,
    isAuthenticated: ({ token }) => !!token,
    userRole: ({ user }) => user.role,
    userName: ({ user }) => user.name,
    checkValidRole: ({ user }) =>
      user.id === sessionStorage.getItem("userId") &&
      user.role === sessionStorage.getItem("userRole"),
    isExpires: ({ expiresDate }) => Date.now() > new Date(+expiresDate),
  },
  mutations: {
    SET_TOKEN(state, { expiresIn, idToken, refreshToken }) {
      state.token = idToken;
      state.expiresDate = Date.now() + (+expiresIn * 1000)
      localStorage.setItem("TOKEN_KEY", idToken);
      localStorage.setItem("REFRESH_TOKEN", refreshToken);
      localStorage.setItem("EXPIRES_IN", state.expiresDate);
    },
    CLEAR_USER(state) {
      state.user = {};
      state.token = null;
    },
    SET_USER(state, user) {
      state.user = user;
      console.log(user);
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("userName", user.name);
      sessionStorage.setItem("userRole", user.role);
    }
  },
  actions: {
    async login({ commit }, dataForm) {
      try {
        commit('loader/TOGGLE_LOADER_BUTTON', true, {root: true})
        const {
          data
        } = await authInApp.post(
          `accounts:signInWithPassword?key=${process.env.VUE_APP_KEY}`,
          { ...dataForm, returnSecureToken: true }
        );
        const { data: user } = await requestToDatabase.get(
          `users/${data.localId}.json`
        );
        commit("SET_USER", { ...user, id: data.localId });
        commit("SET_TOKEN", data);
        commit('loader/TOGGLE_LOADER_BUTTON', false, {root: true})
      } catch (e) {
        console.log(e)
      }
    },
    logOut({ commit }) {
      commit("CLEAR_USER");
      sessionStorage.clear();
      localStorage.clear();
    },
    async signUp({ commit }, dataForm) {
      console.log(dataForm);
      try {
        commit('loader/TOGGLE_LOADER_BUTTON', true)
        const { data } = await authInApp.post(
          `accounts:signUp?key=${process.env.VUE_APP_KEY}`,
          {
            email: dataForm.email,
            password: dataForm.password,
            returnSecureToken: true
          }
        );
        await requestToDatabase.put(`users/${data.localId}.json`, {
          name: dataForm.name,
          role: "user"
        });
        const { data: user } = await requestToDatabase.get(
          `users/${data.localId}.json`
        );
        commit("SET_USER", { ...user, id: data.localId });
        commit('loader/TOGGLE_LOADER_BUTTON', false)
      } catch (e) {
        console.log(e.response.data);
      }
    },
    async refreshToken({state,commit}) {
      const { data } = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_KEY}`, {grant_type: 'refresh_token', refresh_token: state.refreshToken})
      commit("SET_TOKEN", { expiresIn: data.expires_in, refreshToken: data.refresh_token, idToken: data.id_token });

      const { data: user } = await requestToDatabase.get(
        `users/${data.user_id}.json`
      );
      commit("SET_USER", { ...user, id: data.user_id });
    }
  }
};
