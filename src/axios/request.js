import axios from "axios";

const requestToDatabase = axios.create({
  baseURL: process.env.VUE_APP_FB_DB
});

export default requestToDatabase;
