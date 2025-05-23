export type RequestChannels = {
  "quit-app": () => void;
  "window-control": (payload: {
    windowName: "main-window";
    control: "minimize" | "maximize" | "close";
  }) => void;
  "show-application-menu": (payload: { x: number; y: number }) => void;
  "ipc-ready": (windowName: "main-window") => void;
  "change-language": (language: string) => void;
};

export type RequestResponseChannels = {
  "open-external": (path: string) => boolean;
};

export type PushChannels = {
  "before-quit": (window: string) => void;
  "language-changed": (language: string) => void;
};
