import { Menu, ipcMain } from "electron";
import { getMainWindow } from "@/main-window/main-process";

export function setupIpc() {
  ipcMain.removeAllListeners();

  ipcMain.on("window-control", (_event, { control }) => {
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

  ipcMain.on("show-application-menu", (_event, { x, y }) => {
    Menu.getApplicationMenu()?.popup({ x: Math.ceil(x), y: Math.ceil(y) });
  });
}
