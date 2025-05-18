import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { RequestChannels, RequestResponseChannels } from "./channels";

type RequestChannelListener<Channel extends keyof RequestChannels> = (
  event: IpcMainEvent,
  ...args: Parameters<RequestChannels[Channel]>
) => void;

type RequestResponseChannelsListener<
  Channel extends keyof RequestResponseChannels
> = (
  event: IpcMainInvokeEvent,
  ...args: Parameters<RequestResponseChannels[Channel]>
) => Promise<ReturnType<RequestResponseChannels[Channel]>>;

export const typedIpcMain: {
  on<Channel extends keyof RequestChannels>(
    channel: Channel,
    listener: RequestChannelListener<Channel>
  ): void;

  once<Channel extends keyof RequestChannels>(
    channel: Channel,
    listener: RequestChannelListener<Channel>
  ): void;

  handle<Channel extends keyof RequestResponseChannels>(
    channel: Channel,
    handler: RequestResponseChannelsListener<Channel>
  ): void;

  removeHandler<Channel extends keyof RequestResponseChannels>(
    channel: Channel
  ): void;

  removeListener<Channel extends keyof RequestChannels>(
    channel: Channel,
    listener: RequestChannelListener<Channel>
  ): void;

  removeAllListeners<Channel extends keyof RequestChannels>(
    channel?: Channel
  ): void;
} = ipcMain;
