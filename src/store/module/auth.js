import { authInApp, getUser } from "@/axios/request";

export default {
  namespaced: true,
  state() {
    return {
      token: sessionStorage.getItem("userToken"),
      user: {
        id: '',
        role: ''
      }
    };
  },
  getters: {
    userRole: ({ user }) => user.role,
    userName: ({ user }) => user.name,
    checkValidRole: ({ user }) => user.id === sessionStorage.getItem('userId') && user.role === sessionStorage.getItem('userRole')
  },
  mutations: {
    CLEAR_USER(state){
      state.user = {}
    },
    SET_USER(state, user){
      state.user = user
      console.log(user)
      sessionStorage.setItem('userId', user.id)
      sessionStorage.setItem('userRole', user.role)
    }
  },
  actions: {
    async login({ commit }, dataForm) {
      console.log({ ...dataForm, returnSecureToken: true })
      try {
        const { data } = await authInApp.post('',{ ...dataForm, returnSecureToken: true });
        const { data: user } = await getUser.get(`/${data.localId}.json`)
        commit('SET_USER', {...user, id: data.localId})
      } catch (e) {
        console.log(e.response.data.error)
        }

    },
    async autoLogin(){
      const id = sessionStorage.getItem('userId')
      console.log(id)
      // const { data: user } = await getUser.get(`/${id}.json`)
      // await commit('SET_USER', {...user, id: id})
    },
    logOut({commit}) {
      commit('CLEAR_USER')
      sessionStorage.clear()
    }
  }
};
