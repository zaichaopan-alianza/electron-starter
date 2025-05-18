import { ipcRenderer, IpcRendererEvent } from "electron";
import { TypedIpcRenderer } from "./ipc-renderer";

export const ipcBridge: {
  ipcRenderer: TypedIpcRenderer;
} = {
  ipcRenderer: {
    send: (channel: string, ...args) => {
      ipcRenderer.send(channel, ...args);
    },
    // https://www.electronjs.org/docs/latest/tutorial/security#20-do-not-expose-electron-apis-to-untrusted-web-content
    on: (channel: string, callback: (...args: any[]) => void) => {
      const listener = (_event: IpcRendererEvent, ...args: any) => {
        callback(...args);
      };

      ipcRenderer.on(channel, listener);

      return () => {
        ipcRenderer.removeListener(channel, listener);
      };
    },
    invoke: (channel: string, ...args: any[]): Promise<any> => {
      return ipcRenderer.invoke(channel, ...args);
    },
    removeAllListeners: (channel: string) =>
      ipcRenderer.removeAllListeners(channel),
  },
};
