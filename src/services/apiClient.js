import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5050/api",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// apiClient.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = localStorage.getItem("refreshToken");
      const data = {
        refreshToken: token,
      };
      const res = await apiClient.post("/auth/refresh", data);
      localStorage.setItem("token", res.data.data);
      originalRequest.headers.Authorization = `Bearer ${res.data.data}`;
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
