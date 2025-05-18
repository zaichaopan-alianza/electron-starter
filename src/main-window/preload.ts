import { ipcBridge } from "@/typed-ipc/ipc-bridge";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronBridge", {
  ...ipcBridge,
});
