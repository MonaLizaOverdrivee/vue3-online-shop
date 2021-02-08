import axios from "axios";

const requestToDatabase = axios.create({
  baseURL: process.env.VUE_APP_DB_PRODUCTS
});

export default requestToDatabase;
