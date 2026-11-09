import axios from "axios";

const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3002",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = FRONTEND_URL + "/login";
    }
    return Promise.reject(err);
  }
);

export default api;