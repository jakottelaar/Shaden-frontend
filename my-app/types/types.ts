export interface Friend {
  id: number;
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