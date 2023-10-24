export interface Friend {
  id: number;
  username: string;
  status: string | null;
}

export interface PendingFriend {
  requestId: number;
  friendId: number;
  friendUsername: string;
  status: string;
  requestType: string;
}
