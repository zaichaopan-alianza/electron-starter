import { typedIpcMain } from "@/typed-ipc/ipc-main";
import { shell } from "electron";

export function initRequestResponseListeners() {
  typedIpcMain.handle("open-external", async (_event, path) => {
    try {
      await shell.openExternal(path)
      return true
    } catch (e) {
        console.error(`Failed to open external link: ${path}`, e)
      return false
    }
  });
}
