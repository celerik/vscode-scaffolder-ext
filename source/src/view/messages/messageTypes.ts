export type MessageType = 'REDIRECT' | 'COMMON' | 'ERROR' | 'STATE' | 'SCAFFOLDING' | 'SCAFFOLDING-GET-FILE';

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
  expressions: Record<string, { case: string; variable: string }>;
  fields: Record<string, string>;
  folder: string;
  isLocal: boolean;
  isRelative: boolean;
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

export interface RedirectMessage extends Message {
  type: 'REDIRECT';
  payload: string;
}

export interface ErrorMessage extends Message {
  type: 'ERROR';
  payload: string;
}
