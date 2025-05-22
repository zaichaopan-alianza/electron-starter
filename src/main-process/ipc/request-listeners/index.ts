import { BrowserWindow, Menu } from "electron";
import { getMainWindow } from "@/main-window/main-process";
import { typedIpcMain } from "@/typed-ipc/ipc-main";
import { push } from "@/typed-ipc/ipc-web-contents";
import { mainWindowState } from "@/main-window/main-process/state";

export function initRequestListeners() {
  typedIpcMain.removeAllListeners();

  typedIpcMain.on("ipc-ready", (event, windowName) => {
    if (windowName === "main-window") {
      mainWindowState.ipcReady();
    }
  });

  typedIpcMain.on("window-control", (event, { control }) => {
    const window = BrowserWindow.getAllWindows().find((window) => {
      window.webContents.id === event.sender.id;
    });

    if (!window) {
      return;
    }

    if (control === "minimize" && window.isMinimizable()) {
      return window.minimize();
    }

    if (control === "maximize" && window.isMaximizable()) {
      return window.isMaximized() ? window.unmaximize() : window.maximize();
    }

    if (control === "close" && window.isClosable()) {
      return window.close();
    }
  });

  typedIpcMain.on("show-application-menu", (_event, { x, y }) => {
    Menu.getApplicationMenu()?.popup({ x: Math.ceil(x), y: Math.ceil(y) });
  });

  typedIpcMain.on("change-language", (_event, language) => {
    // ...
    push(BrowserWindow.getAllWindows(), "language-changed", language);
  });
}
