export type MessageType = 'RELOAD' | 'COMMON' | 'ERROR' | 'STATE' | 'SCAFFOLDING';

export interface Message {
  type: MessageType;
  payload?: any;
}

export interface CommonMessage extends Message {
  type: 'COMMON';
  payload: string;
}

export interface StateMessage extends Message {
  type: 'STATE';
  payload: Object;
}

export interface ReloadMessage extends Message {
  type: 'RELOAD';
}

export interface ErrorMessage extends Message {
  type: 'ERROR';
  payload: string;
}
