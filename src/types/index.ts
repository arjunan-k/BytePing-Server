export interface User {
  _id: string;
  name: string;
  email?: string;
  pic: string;
}

export interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  groupAdmin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Message {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sender: User;
  content: string;
  chat: Chat;
}
