import { app, BrowserWindow } from "electron";
import { setApplicationMenu } from "./menu";
import { createMainWindow } from "@/main-window/main-process";
import { initRequestListeners } from "./ipc/request-listeners";
import { initRequestResponseListeners } from "./ipc/request-response-listeners";
import { setupDevTools } from "./devtools";
import { listenForProtocolHandler, setupProtocolHandler } from "./protocol";
import { storage } from "./fileStorage";
import { AppState } from "./app-state";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

export const appState = new AppState(storage);

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
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

function onReady() {
  setupDevTools();
  // setup
  initRequestListeners();
  initRequestResponseListeners();
  //  setupMenu();
  setApplicationMenu();
  createMainWindow();
  setupProtocolHandler();
}
