import { app} from "electron";
import { setupApplicationMenu } from "./menu";
import { createMainWindow, getMainWindow } from "@/main-window/main-process";
import { setupRequestListeners } from "./ipc/request-listeners";
import { setupRequestResponseListeners } from "./ipc/request-response-listeners";
import { setupDevTools } from "./devtools";
import { listenForProtocolHandler, setupProtocolHandler } from "./protocol";
import { createContextMenu } from "./create-content-menu";
import { appState } from "./app-state";
import { push } from "@/typed-ipc/ipc-web-contents";
import { showWindow } from "./window";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

createContextMenu();
listenForProtocolHandler();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", onReady);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  showWindow(getMainWindow());
});

// When autoUpdater.quitAndInstall(), it is emitted after the window close event
// Otherwise it is emitted before the window close event
// Fully control the quit process to avoid quit from dock icon or menu
app.on("before-quit", (event) => {
  const mainWindow = getMainWindow();

  if (mainWindow) {
    // Always prevent the default and let the renderer to confirm
    if (!appState.getIsQuitting()) {
      event.preventDefault();
      push(mainWindow, "before-quit");
    }
  }
});

function onReady() {
  setupDevTools();
  setupRequestListeners();
  setupRequestResponseListeners();
  setupApplicationMenu();
  setupProtocolHandler();
  createMainWindow();
}

// persist window state
// badge
// dock icon
// tray icon
// https://github.com/RocketChat/Rocket.Chat.Electron/blob/6c9314736fb1aaf2da99d3263a16c3d2ed74af5c/src/ui/main/rootWindow.ts#L162
// https://github.com/signalapp/Signal-Desktop/blob/010c38ae9bce84c676a9c464a04f7c26e7a2c9e0/app/main.ts

/**
 * export function getMainWindowOptions(): Electron.BrowserWindowConstructorOptions {
  const HEADER_COMMANDS_HEIGHT = 50;
  const MACOS_TRAFFIC_LIGHTS_HEIGHT = 16;

  return {
    width: 1400,
    height: 900,
    minHeight: 600,
    minWidth: 600,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : undefined,
    titleBarOverlay: process.platform === 'darwin',
    trafficLightPosition: {
      x: 20,
      y: HEADER_COMMANDS_HEIGHT / 2 - MACOS_TRAFFIC_LIGHTS_HEIGHT / 2,
    },
    acceptFirstMouse: true,
    backgroundColor: '#1d2427',
    show: false,
    webPreferences: {
      preload: !!process.env.JEST
        ? path.join(process.cwd(), './.webpack/renderer/main_window/preload.js')
        : MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  };
}
 */