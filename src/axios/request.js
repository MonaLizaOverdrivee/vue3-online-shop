import axios from "axios";

const requestToDatabase = axios.create({
  baseURL: process.env.VUE_APP_FB_DB
});

const authInApp = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_KEY}`
})

const getUser = axios.create({
  baseURL: 'https://vue3-online-shop-demo-default-rtdb.europe-west1.firebasedatabase.app/users'
})
export { requestToDatabase, authInApp, getUser }