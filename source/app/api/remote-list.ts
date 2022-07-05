/* global vscode */
// @packages
import axios from 'axios';

// @scripts
import { API_URL_GITHUB } from './index';
import { ErrorMessage } from '../../src/view/messages/messageTypes';
import { GIT_URL } from '../utils/regex';
import { IFolder } from '../utils/interfaces/remoteFolders.interface';

export class RemoteList {
  urlRepo: string;

  constructor(urlRepo: string) {
    this.urlRepo = urlRepo;
  }

  async getConfigFile(nameFolder: string): Promise<Array<string>> {
    try {
      const urlgitHub = `${this.getUrlRepo()}/${nameFolder}/config.json`;
      const infoFile = await axios.get(urlgitHub);
      const request = await axios.get(infoFile.data.download_url);
      return request.data.variables;
    } catch (error) {
      vscode.postMessage<ErrorMessage>({
        type: 'ERROR',
        payload: error as string
      });
      throw error;
    }
  }

  async getListOfFolders(): Promise<Array<IFolder>> {
    try {
      const result = await axios.get(this.getUrlRepo());
      return result.data.filter((item: IFolder) => item.type === 'dir');
    } catch (error) {
      vscode.postMessage<ErrorMessage>({
        type: 'ERROR',
        payload: error as string
      });
      throw error;
    }
  }

  getUrlRepo() {
    const urlArray = GIT_URL.exec(this.urlRepo) || [];
    const urlgitHub = urlArray.length >= 6
      ? `${API_URL_GITHUB}${urlArray[4]}/${urlArray[5]}/contents`
      : API_URL_GITHUB;
    return urlgitHub;
  }
}
// export const remoteList = new RemoteList();
