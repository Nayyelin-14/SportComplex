import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
//  An interceptor allows you to modify or process the request before it is sent out or handle any errors in the request.
// const getToken = () => {
//   ;
//   console.log(TOKEN);
//   return TOKEN;
// };
instance.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
      // console.log("Authorization Header:", config.headers.Authorization);
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
