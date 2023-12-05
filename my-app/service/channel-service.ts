import { Channel } from "@/types/types";
import { AxiosInstance } from "axios";

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
    if (error.response.data.status === 404) {
      const response = await createDMChannel(axios, userId);

      return response;
    }
    return error.response.data;
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

export const getAllChannels = async (axios: AxiosInstance) => {
  try {
    const response = await axios.get(`/api/channels`);

    const result = response.data.results;
    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getAllDirectMessageChannels = async (axios: AxiosInstance) => {
  try {
    const response = await axios.get(`/api/channels/direct`);

    const result = response.data.results;
    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
