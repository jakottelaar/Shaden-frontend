import { axiosInstance } from "@/lib/axios-service";
import { Friend, PendingFriend } from "@/types/types";

export const sentFriendRequest = async (username: string) => {
  try {
    const response = await axiosInstance.post(`/api/friends/requests`, {
      username,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getPendingFriendRequests = async (): Promise<PendingFriend[]> => {
  try {
    const response = await axiosInstance.get(`/api/friends/pending`);

    const result = response.data.results as PendingFriend[];

    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const acceptFriendRequest = async (userId: number) => {
  try {
    const response = await axiosInstance.patch(
      `/api/friends/requests/${userId}/accept`,
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getAllFriends = async (): Promise<Friend[]> => {
  try {
    const response = await axiosInstance.get(`/api/friends/list`);

    const result = response.data.results as Friend[];

    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const cancelOutgoingFriendRequest = async (userId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/friends/${userId}/cancel`,
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const rejectIncomingFriendRequest = async (userId: number) => {
  try {
    const response = await axiosInstance.patch(
      `/api/friends/requests/${userId}/reject`,
    );

    console.log(response.data);

    const result = response.data.results;

    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const removeFriend = async (userId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/friends/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getFriendById = async (userId: number): Promise<Friend> => {
  try {
    const response = await axiosInstance.get(`/api/friends/${userId}`);

    const result = response.data.results as Friend;

    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
