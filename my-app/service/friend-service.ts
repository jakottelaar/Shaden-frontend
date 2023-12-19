import { AxiosInstance } from "axios";
import { Friend, PendingFriend } from "@/types/types";

export const sentFriendRequest = async (
  axios: AxiosInstance,
  username: string,
) => {
  try {
    const response = await axios.post(`/api/friends/requests`, {
      username,
    });
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

export const acceptFriendRequest = async (
  axios: AxiosInstance,
  userId: number,
) => {
  try {
    const response = await axios.patch(
      `/api/friends/requests/${userId}/accept`,
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getAllFriends = async (
  axios: AxiosInstance,
): Promise<Friend[]> => {
  try {
    const response = await axios.get(`/api/friends/list`);

    const result = response.data.results as Friend[];

    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const cancelOutgoingFriendRequest = async (
  axios: AxiosInstance,
  userId: number,
) => {
  try {
    const response = await axios.delete(`/api/friends/${userId}/cancel`);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const rejectIncomingFriendRequest = async (
  axios: AxiosInstance,
  userId: number,
) => {
  try {
    const response = await axios.patch(
      `/api/friends/requests/${userId}/reject`,
    );

    const result = response.data.results;

    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const removeFriend = async (axios: AxiosInstance, userId: number) => {
  try {
    const response = await axios.delete(`/api/friends/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getFriendById = async (
  axios: AxiosInstance,
  creatorId: number | undefined,
  participantId: number,
): Promise<Friend> => {
  try {
    const response = await axios.get(`/api/friends/${creatorId}`);

    const result = response.data.results as Friend;

    return result;
  } catch (error: any) {
    //Todo: Fix this hacky solution
    if (error.response.status === 500) {
      const response = await axios.get(`/api/friends/${participantId}`);

      const result = response.data.results as Friend;

      return result;
    }
    console.error(error);
    return error.response.data;
  }
};
