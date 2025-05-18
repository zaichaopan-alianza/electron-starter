declare module "*.png";
declare module "*.svg";

declare const __DEV__: boolean;
declare const __WIN32__: boolean;
declare const __DARWIN__: boolean;
declare const __DEV__: boolean;

declare type IpcRenderer = import("./typed-ipc/ipc-renderer").TypedIpcRenderer;

declare const electronBridge: {
  ipcRenderer: IpcRenderer;
};
