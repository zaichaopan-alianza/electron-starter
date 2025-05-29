import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import { typedIpcMain } from "@/typed-ipc/ipc-main";
import { push } from "@/typed-ipc/ipc-web-contents";
import { mainWindowState } from "@/main-window/main-process/state";
import { appState } from "@/main-process/app-state";

export function setupRequestListeners() {
  typedIpcMain.removeAllListeners();

  typedIpcMain.on("quit-app", () => {
    appState.setIsQuitting(true);
    app.quit();
  });

  typedIpcMain.on("ipc-ready", (_event, windowName) => {
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

  typedIpcMain.on("show-context-menu", (event) => {
    const template: Array<MenuItemConstructorOptions> = [
      {
        label: "Menu Item 1",
        click: () => {
          event.sender.send("context-menu-command", "menu-item-1");
        },
      },
      { type: "separator" },
      { label: "Menu Item 2", type: "checkbox", checked: true },
    ];
    const menu = Menu.buildFromTemplate(template);
    const window = BrowserWindow.fromWebContents(event.sender);

    if (window) {
      menu.popup({ window });
    }
  });
}
