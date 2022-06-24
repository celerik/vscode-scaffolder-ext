/* global vscode */
// @packages
import axios from 'axios';

// @scripts
import { API_URL_GITHUB } from './index';
import { ErrorMessage } from '../../src/view/messages/messageTypes';
import { GIT_URL } from '../utils/regex';
import { IFolder } from '../utils/interfaces/remoteFolders.interface';

class RemoteList {
  async getListOfFolders(urlRepo: string): Promise<Array<IFolder>> {
    try {
      const urlArray = GIT_URL.exec(urlRepo) || [];
      const urlgitHub = urlArray.length >= 6 ? `${API_URL_GITHUB}${urlArray[4]}/${urlArray[5]}/contents` : API_URL_GITHUB;
      const result = await axios.get(urlgitHub);
      return result.data.filter((item: IFolder) => item.type === 'dir');
    } catch (error) {
      vscode.postMessage<ErrorMessage>({
        type: 'ERROR',
        payload: error as string
      });
      throw error;
    }
  }
}
export const remoteList = new RemoteList();
