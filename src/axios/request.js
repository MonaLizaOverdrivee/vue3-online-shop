import axios from "axios";

const requestToDatabase = axios.create({
  baseURL: process.env.VUE_APP_FB_DB
});

const authInApp = axios.create({
  baseURL:' https://identitytoolkit.googleapis.com/v1/'
})


export { requestToDatabase, authInApp }