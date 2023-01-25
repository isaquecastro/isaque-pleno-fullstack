import axios from "axios";

const api: any = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response: any) => {
    if (response.status === 401) {
      api.defaults.headers["Authorization"] = ` `;

      localStorage.removeItem("@ATLAS:token");
      localStorage.removeItem("@ATLAS:name");

      window.location.href = "/login";
    }
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
      api.defaults.headers["Authorization"] = ` `;

      localStorage.removeItem("@ATLAS:token");
      localStorage.removeItem("@ATLAS:name");

      window.location.href = "/login";
      return null;
    }

    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export default api;
