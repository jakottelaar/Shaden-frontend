import useAxios from "@/lib/hooks/useAxios";

const axios = useAxios();

export const getUserProfile = async () => {
  try {
    const response = await axios.get("/api/users/profile");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
