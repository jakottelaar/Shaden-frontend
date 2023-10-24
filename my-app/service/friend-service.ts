import { Friend, PendingFriend } from "@/types/types";
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

export const getPendingFriendRequests = async (
  axios: AxiosInstance,
): Promise<PendingFriend[]> => {
  try {
    const response = await axios.get(`/api/friends/pending`);

    const result = response.data.results as PendingFriend[];

    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
