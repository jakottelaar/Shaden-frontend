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
  creator_id: number | undefined;
  participant_id: number;
}

export interface MessageRequest {
  channel_id: number | undefined;
  sender_id: number | undefined;
  content: string;
}

export interface MessageResponse {
  message_id: number;
  channel_id: number;
  sender_id: number;
  content: string;
  created_at: string;
  last_modified_date: string;
}
