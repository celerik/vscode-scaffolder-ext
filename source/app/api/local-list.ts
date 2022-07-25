/* global vscode */
// @packages
// import axios from 'axios';

// @scripts

export class RemoteList {
  async getConfigFile() {
    vscode.postMessage({
      type: 'ERROR',
      payload: { folder: 'hola' }
    });
  }
}
export const remoteList = new RemoteList();
