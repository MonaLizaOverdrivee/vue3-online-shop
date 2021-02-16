import { authInApp, requestToDatabase } from "@/axios/request";

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem("TOKEN_KEY"),
      user: {
        id: '',
        role: '',
        name: sessionStorage.getItem('userName')
      }
    };
  },
  getters: {
    isAuthenticated: ({ token }) => !!token,
    userRole: ({ user }) => user.role,
    userName: ({ user }) => user.name,
    checkValidRole: ({ user }) => user.id === sessionStorage.getItem('userId') && user.role === sessionStorage.getItem('userRole')
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('TOKEN_KEY', token)
    },
    CLEAR_USER(state){
      state.user = {}
      state.token = null
    },
    SET_USER(state, user){
      state.user = user
      console.log(user)
      sessionStorage.setItem('userId', user.id)
      sessionStorage.setItem('userName', user.name)
      sessionStorage.setItem('userRole', user.role)
    }
  },
  actions: {
    async login({ commit }, dataForm) {
        const { data } = await authInApp.post(`accounts:signInWithPassword?key=${process.env.VUE_APP_KEY}`,{ ...dataForm, returnSecureToken: true });
        const { data: user } = await requestToDatabase.get(`users/${data.localId}.json`)
        await commit('SET_USER', {...user, id: data.localId})
        await commit('SET_TOKEN', data.idToken)

    },
    logOut({commit}) {
      commit('CLEAR_USER')
      sessionStorage.clear()
      localStorage.clear()
    },
    async signUp({commit}, dataForm){
      console.log(dataForm)
      try {
        const { data } = await authInApp.post(`accounts:signUp?key=${process.env.VUE_APP_KEY}`,{
          email: dataForm.email,
          password: dataForm.password,
          returnSecureToken: true
        });
        await requestToDatabase.put(`users/${data.localId}.json`, {
          name: dataForm.name,
          role: 'user'
        })
        const { data: user } = await requestToDatabase.get(`users/${data.localId}.json`)
        await commit('SET_USER', {...user, id: data.localId})
      } catch (e) {
        console.log(e.response.data)
      }

    }
  }
};
