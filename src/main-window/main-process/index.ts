import { appState } from "@/main-process/app-state";
import { push } from "@/typed-ipc/ipc-web-contents";
import { BrowserWindow } from "electron";
import path from "node:path";

let mainWindow: BrowserWindow | null = null;

export const createMainWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 650,
    minWidth: 725,
    webPreferences: {
      preload: path.join(__dirname, "main_window_preload.js"),
    },
    titleBarStyle: "hiddenInset",
    frame: !__WIN32__,
    show: false,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/main-window.html`);
  } else {
    mainWindow.loadFile(
      path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/main-window.html`
      )
    );
  }

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("close", (event) => {
    // if (appState.getIsQuitting() || shouldQuitForUpdate()
    if (appState.getIsQuitting()) {
      return;
    }
    // Hide main window instead of closing
    event.preventDefault();

    if (__DARWIN__) {
      if (mainWindow?.isFullScreen()) {
        mainWindow.once("leave-full-screen", () => {
          hideMainWindow();
        });
        mainWindow.setFullScreen(false);
        return;
      }

      hideMainWindow();
      return;
    }

    if (__WIN32__) {
      hideMainWindow();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

export function getMainWindow() {
  return mainWindow;
}

function hideMainWindow() {
  mainWindow?.blur();
  mainWindow?.hide();
}
