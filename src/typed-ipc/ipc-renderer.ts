import {
  RequestChannels,
  RequestResponseChannels,
  PushChannels,
} from "./channels";

type PushChannelListener<Channel extends keyof PushChannels> = (
  ...args:Parameters<PushChannels[Channel]>
) => void | (() => void);

export interface TypedIpcRenderer {
  on<Channel extends keyof PushChannels>(
    channel: Channel,
    listener: PushChannelListener<Channel>
  ): () => void;
  send<Channel extends keyof RequestChannels>(
    channel: Channel,
    ...args: Parameters<RequestChannels[Channel]>
  ): void;
  invoke<Channel extends keyof RequestResponseChannels>(
    channel: Channel,
    ...args: Parameters<RequestResponseChannels[Channel]>
  ): Promise<ReturnType<RequestResponseChannels[Channel]>>;
  removeAllListeners<Channel extends keyof RequestChannels>(
    channel: Channel
  ): void;
}
