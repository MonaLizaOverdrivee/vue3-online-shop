import axios from "axios";

const requestCartProduct = axios.create({
  baseURL: process.env.VUE_APP_DB_PRODUCTS
});

export default requestCartProduct;
