import axios from "axios";

const api = axios.create({
  baseURL: "https://pms-a7jh.onrender.com/api",
});

export default api;