import { Channel } from "@/types/types";
import axios, { AxiosInstance } from "axios";

export const getChannelByUserId = async (
  axios: AxiosInstance,
  userId: number,
): Promise<Channel> => {
  try {
    const response = await axios.get(`/api/channels/direct/user/${userId}`);

    console.log(response.data);

    const result = response.data.results as Channel;

    return result;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};

export const createDMChannel = async (
  axios: AxiosInstance,
  userId: number,
): Promise<Channel> => {
  try {
    const response = await axios.post(`/api/channels/direct`, {
      userId,
    });

    console.log(response.data);

    const result = response.data.results as Channel;

    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getDmChannelWithId = async (
  axios: AxiosInstance,
  channelId: number,
): Promise<Channel> => {
  try {
    const response = await axios.get(`/api/channels/direct/${channelId}`);

    const result = response.data.results as Channel;
    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
