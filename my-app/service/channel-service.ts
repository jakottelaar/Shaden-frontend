import { Channel } from "@/types/types";
import { axiosInstance } from "@/lib/axios-service";

export const getChannelByUserId = async (userId: number): Promise<Channel> => {
  try {
    const response = await axiosInstance.get(
      `/api/channels/direct/user/${userId}`,
    );

    console.log(response.data);

    const result = response.data.results as Channel;

    return result;
  } catch (error: any) {
    if (error.response.data.status === 404) {
      const response = await createDMChannel(userId);

      return response;
    }
    return error.response.data;
  }
};

export const createDMChannel = async (userId: number): Promise<Channel> => {
  try {
    const response = await axiosInstance.post(`/api/channels/direct`, {
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
  channelId: number,
): Promise<Channel> => {
  try {
    const response = await axiosInstance.get(
      `/api/channels/direct/${channelId}`,
    );

    const result = response.data.results as Channel;
    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getAllChannels = async () => {
  try {
    const response = await axiosInstance.get(`/api/channels`);

    const result = response.data.results;
    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};

export const getAllDirectMessageChannels = async () => {
  try {
    const response = await axiosInstance.get(`/api/channels/direct`);

    const result = response.data.results;
    return result;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
};
