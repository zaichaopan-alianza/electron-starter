import { ipcBridge } from "@/typed-ipc/ipc-bridge";
import { contextBridge} from "electron";

contextBridge.exposeInMainWorld("electronBridge", {
  ...ipcBridge,
});
