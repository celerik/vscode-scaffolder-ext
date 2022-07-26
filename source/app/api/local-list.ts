/* global vscode */

export class LocalList {
  async getConfigFile(folder: string) {
    vscode.postMessage({
      type: 'SCAFFOLDING-GET-FILE',
      payload: { folder, file: 'config.json' }
    });
  }
}
export const localList = new LocalList();
