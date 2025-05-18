import { Menu } from "electron";
import { getMainWindow } from "@/main-window/main-process";
import { typedIpcMain } from "@/typed-ipc/ipc-main";

export function initRequestListeners() {
  typedIpcMain.removeAllListeners();

  typedIpcMain.on("window-control", (_event, { control }) => {
    const window = getMainWindow();
    if (!window) {
      return;
    }

    if (control === "minimize") {
      return window.minimize();
    }

    if (control === "maximize") {
      return window.isMaximized() ? window.unmaximize() : window.maximize();
    }

    if (control === "close") {
      return window.close();
    }
  });

  typedIpcMain.on("show-application-menu", (_event, { x, y }) => {
    Menu.getApplicationMenu()?.popup({ x: Math.ceil(x), y: Math.ceil(y) });
  });
}
