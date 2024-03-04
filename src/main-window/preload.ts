import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronBridge", {
  windowControl: (payload: {
    windowName: "main-window";
    control: "maximize" | "minimize" | "close";
  }) => {
    ipcRenderer.send("window-control", payload);
  },
  showApplicationMenu: (payload: { x: number; y: number }) => {
    ipcRenderer.send("show-application-menu", payload);
  },
});
