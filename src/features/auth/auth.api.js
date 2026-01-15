import apiClient from "../../services/apiClient";

export const loginApi = async (data) => {
  const res = await apiClient.post("/auth/login", data);
  return res;
};
