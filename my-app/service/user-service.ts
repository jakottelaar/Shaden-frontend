import api from "./api-config";

const token = localStorage.getItem("accessToken");

const AuthHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/users/profile", AuthHeader);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
