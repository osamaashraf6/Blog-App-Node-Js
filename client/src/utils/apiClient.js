import axios from "axios";
import globalService from "../services/globalService";

const apiClient = axios.create({
  baseURL: globalService.baseUrl,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

apiClient.interceptors.request.use(
  (config) => {
    // const token = JSON.parse(localStorage.getItem("persist:root"))?.user?.currentUser?.token;
    const token = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const getToken = JSON.parse(token)?.currentUser?.token;
    if (getToken) {
      config.headers.authorization = `Bearer ${getToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
