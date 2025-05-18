import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";

export function showWindow(window: BrowserWindow | null) {
  if (!window) {
    return;
  }

  window.setAlwaysOnTop(true);

  if (window.isMinimized()) {
    window.restore();
  }

  if (!window.isVisible()) {
    window.show();
  }

  window.setAlwaysOnTop(false);

  window.focus();

  app.focus({
    steal: true,
  });
}

/**
 * Prevent when a link on screen selected, pressing `Ctrl+enter`, `CommandOrControl+R` or
 * `CommandOrControl+shift+R` causing window to refresh to show white screen
 */
export function preventWindowReload(
  window: BrowserWindow,
  allowedUrls?: string[]
) {
  window.webContents.on("will-navigate", (event, url) => {
    // const allowedUrls = ['ms-settings:'];
    const shouldAllow = allowedUrls?.some((allowedUrl) => {
      return url.includes(allowedUrl);
    });

    if (!shouldAllow) {
      event.preventDefault();
    }
  });
}

/**
 * Prevent when a link on screen is selected, pressing `CMD+enter`, `Ctrl+shift+enter` or
 *  `CMD+shift+enter` causing opening a new blank window
 */

export function preventOpenWindowFromRenderer(
  window: BrowserWindow,
  options?: {
    allowedUrls: string[];
    overrideBrowserWindowOptions?: BrowserWindowConstructorOptions;
  }
) {
  window.webContents.setWindowOpenHandler(({ url }) => {
    const shouldAllow = options?.allowedUrls.some((allowedUrl) =>
      url.includes(allowedUrl)
    );

    return shouldAllow
      ? {
          action: "allow",
          overrideBrowserWindowOptions: options?.overrideBrowserWindowOptions,
        }
      : {
          action: "deny",
        };
  });
}
