import axios from "axios";
import store from "../store";

const requestToDatabase = axios.create({
  baseURL: process.env.VUE_APP_FB_DB
});

const authInApp = axios.create({
  baseURL: " https://identitytoolkit.googleapis.com/v1/"
});

requestToDatabase.defaults.params = {};

requestToDatabase.interceptors.request.use(config => {
  if (!store.getters["auth/isAuthenticated"]) return config;
  if (
    store.getters["auth/isAuthenticated"] &&
    store.getters["auth/isExpires"]
  ) {
    store.dispatch("auth/refreshToken");
  }
  config.params["auth"] = store.getters["auth/token"];
  return config;
});

requestToDatabase.interceptors.response.use(
  function(response) {
    console.log(response);
    return response;
  },
  function() {
    store.dispatch("auth/logOut");
  }
);

export { requestToDatabase, authInApp };
