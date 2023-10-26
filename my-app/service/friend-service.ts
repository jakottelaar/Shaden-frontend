import { Friend, PendingFriend } from "@/types/types";
import axios, { AxiosInstance } from "axios";

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

export const acceptFriendRequest = async (
  axios: AxiosInstance,
  userId: number,
) => {
  try {
    const response = await axios.patch(`/api/friends/${userId}/accept`);
    console.log(response.data);
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
    console.log(response.data);
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
    const response = await axios.patch(`/api/friends/${userId}/reject`);

    console.log(response.data);

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
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
