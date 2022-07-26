export type MessageType = 'RELOAD' | 'COMMON' | 'ERROR' | 'STATE' | 'SCAFFOLDING' | 'SCAFFOLDING-GET-FILE';

export interface Message {
  type: MessageType;
  payload?: any;
}

export interface IFolder {
  folder: string;
  path: string;
  content: string;
}

export interface Data {
  data: Array<IFolder>;
  folder: string;
  fields: Record<string, string>;
  isLocal: boolean;
}

export interface CommonMessage extends Message {
  type: 'COMMON';
  payload: string;
}

export interface FilesMessage extends Message {
  type: 'COMMON';
  payload: Data;
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
