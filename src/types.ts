export interface UserI {
  id: string;
  name: string;
  image: string;
}

export interface MessageI {
  sender: string;
  receiver: string;
  tag: string;
  message: string;
  timeStamp: string;
}
