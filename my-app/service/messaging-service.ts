import { AxiosInstance } from "axios";

export const getChannelMessagingHistory = async (
  axios: AxiosInstance,
  channelId: number,
) => {
  try {
    const response = await axios.get(
      `/api/messages/channel/${channelId}/history`,
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};
