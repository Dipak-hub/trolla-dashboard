import axios from "axios";

const rootClient = axios.create();
rootClient.defaults.timeout = 4000;
rootClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default rootClient;
