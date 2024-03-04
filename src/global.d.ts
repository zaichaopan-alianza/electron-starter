declare module "*.png";
declare module "*.svg";

declare const __DEV__: boolean;
declare const __WIN32__: boolean;
declare const __DARWIN__: boolean;
declare const __DEV__: boolean;

declare type IpcRenderer = import("./ipc/ipc-renderer").TypedIpcRenderer;

declare const electronBridge: {
  windowControl: (payload: {
    windowName: "main-window";
    control: "maximize" | "minimize" | "close";
  }) => void;
  showApplicationMenu: (payload: { x: number; y: number }) => void;
};
