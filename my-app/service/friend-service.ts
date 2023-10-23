import { AxiosInstance } from "axios";

export const sentFriendRequest = async (
  axios: AxiosInstance,
  username: string,
) => {
  try {
    const response = await axios.post(`/api/friends/add`, { username });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
