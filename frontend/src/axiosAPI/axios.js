import axios from "axios";
const getToken = () => {
  const TOKEN = localStorage.getItem("token");
  return TOKEN;
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
//  An interceptor allows you to modify or process the request before it is sent out or handle any errors in the request.

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
