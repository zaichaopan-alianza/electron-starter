export class MainWindowState {
  private isIpcReady = false;

  constructor() {
    this.isIpcReady = false;
  }

  ipcReady() {
    this.isIpcReady = true;
  }

  getIsIpcReady() {
    return this.isIpcReady;
  }
}

export const mainWindowState = new MainWindowState();
