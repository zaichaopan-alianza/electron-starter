export type ContextMenuData = {
  type: "message";
  data: { id: string };
};

export type RequestChannels = {
  "quit-app": () => void;
  "window-control": (payload: {
    windowName: "main-window";
    control: "minimize" | "maximize" | "close";
  }) => void;
  "show-application-menu": (payload: { x: number; y: number }) => void;
  "ipc-ready": (windowName: "main-window") => void;
  "change-language": (language: string) => void;
  "show-context-menu": () => void;
  "context-menu-data": (
    data?: ContextMenuData
  ) => void;
};

export type RequestResponseChannels = {
  "open-external": (path: string) => boolean;
};

export type PushChannels = {
  "before-quit": () => void;
  "language-changed": (language: string) => void;
  "get-context-menu-element": (payload: { x: number; y: number }) => void;
};
