import { BrowserWindow } from "electron";
import { PushChannels } from "./channels";

export function push<Channel extends keyof PushChannels>(
  window: BrowserWindow | null,
  channel: Channel,
  ...args: Parameters<PushChannels[Channel]>
): void {
  if (window && !window.isDestroyed()) {
    window.webContents.send(channel, ...args);
  }
}
