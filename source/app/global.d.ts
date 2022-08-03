/* eslint-disable no-unused-vars */
type Message = import('../src/view/messages/messageTypes').Message;

type VSCode = {
  postMessage<T extends Message = Message>(message: T): void;
  getState(): any;
  setState(state: any): void;
};

declare const vscode: VSCode;

declare const prevState: string;

declare const localTemplates: string;
