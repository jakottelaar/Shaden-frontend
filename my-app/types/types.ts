export interface Friend {
  friendId: number;
  friendUsername: string;
  status: string | null;
}

export interface PendingFriend {
  requestId: number;
  friendId: number;
  friendUsername: string;
  status: string;
  requestType: string;
}

export interface Channel {
  channel_id: number;
  user1_id: number;
  user2_id: number;
}
