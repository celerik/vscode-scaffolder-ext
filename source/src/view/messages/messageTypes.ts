export type MessageType = 'RELOAD' | 'COMMON' | 'ERROR';

export interface Message {
  type: MessageType;
  payload?: any;
}

export interface CommonMessage extends Message {
  type: 'COMMON';
  payload: string;
}

export interface ReloadMessage extends Message {
  type: 'RELOAD';
}

export interface ErrorMessage extends Message {
  type: 'ERROR';
  payload: string;
}
