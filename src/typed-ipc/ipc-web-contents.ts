import { BrowserWindow } from "electron";
import { PushChannels } from "./channels";

export function push<Channel extends keyof PushChannels>(
  window: BrowserWindow | null | Array<BrowserWindow>,
  channel: Channel,
  ...args: Parameters<PushChannels[Channel]>
) {
  if (!window) {
    return;
  }
  const windows = Array.isArray(window) ? window : [window];

  windows.forEach((window) => {
    if (!window.isDestroyed()) {
      window.webContents.send(channel, ...args);
    }
  });
}
