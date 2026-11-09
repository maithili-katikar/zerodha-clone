import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

// If the backend says "not logged in", send the user to the login page
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "http://localhost:3000/login";
    }
    return Promise.reject(err);
  }
);

export default api;