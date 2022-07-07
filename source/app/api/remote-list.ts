/* global vscode */
// @packages
import axios from 'axios';

// @scripts
import { API_URL_GITHUB } from './index';
import { ErrorMessage } from '../../src/view/messages/messageTypes';
import { GIT_URL } from '../utils/regex';
import { IFolder } from '../utils/interfaces/remoteFolders.interface';

export class RemoteList {
  async getConfigFile(urlRepo:string, nameFolder: any): Promise<Array<string>> {
    try {
      const urlgitHub = `${this.getUrlRepo(urlRepo)}/${nameFolder}/config.json`;
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

  async getListOfFolders(urlRepo:string): Promise<Array<IFolder>> {
    try {
      const result = await axios.get(this.getUrlRepo(urlRepo));
      return result.data.filter((item: IFolder) => item.type === 'dir');
    } catch (error: any) {
      vscode.postMessage<ErrorMessage>({
        type: 'ERROR',
        payload: error.message
      });
      return [];
    }
  }

  getUrlRepo(urlRepo:string) {
    const urlArray = GIT_URL.exec(urlRepo) || [];
    const urlgitHub = urlArray.length >= 6
      ? `${API_URL_GITHUB}${urlArray[4]}/${urlArray[5]}/contents`
      : API_URL_GITHUB;
    return urlgitHub;
  }
}
export const remoteList = new RemoteList();
