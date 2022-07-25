/* eslint-disable no-restricted-syntax */
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
      const infoFile = await this.getFile(urlRepo, nameFolder, 'config.json');
      const request = await axios.get(infoFile.download_url || '');
      return request.data.variables;
    } catch (error: any) {
      vscode.postMessage<ErrorMessage>({
        type: 'ERROR',
        payload: error.message as string
      });
      return [];
    }
  }

  async getFile(urlRepo:string, pathFile: string, fileName: string): Promise<IFolder> {
    try {
      const urlgitHub = `${this.getUrlRepo(urlRepo)}/${pathFile}/${fileName}`;
      const infoFile = await axios.get(urlgitHub);
      return infoFile.data;
    } catch (error: any) {
      throw new Error(`The file ${fileName} was not found`);
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

  async walk(dir: string) {
    let results: Record<string, string>[] = [];
    const list = await axios.get(dir);
    for await (const file of list.data) {
      if (file.type === 'dir') {
        /* Recurse into a directory */
        results = results.concat(await this.walk(`${dir}\\${file.name}`));
      } else {
        /* Is a file */
        results.push({ downloadUrl: file.download_url, path: file.path });
      }
    }
    return results;
  }

  async getTreeFolders(urlRepo:string, customUri: string): Promise<Array<IFolder>> {
    try {
      const result = await this.walk(`${this.getUrlRepo(urlRepo)}/${customUri}`);
      const resultsInfo: any[] = [];
      result.forEach((element) => {
        resultsInfo.push(axios.get(element.downloadUrl));
      });
      return await Promise.all(resultsInfo);
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
