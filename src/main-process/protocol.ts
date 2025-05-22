import { mainWindowState } from "@/main-window/main-process/state";
import { app } from "electron";
import path from "node:path";
import pWaitFor from "p-wait-for";

const defaultProtocol = "electron-starter";

// https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app
export function setupProtocolHandler() {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(defaultProtocol, process.execPath, [
        path.resolve(process.argv[1] ?? ""),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient("defaultProtocol");
  }
}

export function listenForProtocolHandler() {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  }

  app.removeAllListeners("open-url");

  app.on("open-url", (_, url) => {
    handlePotentialProtocolLaunch(url);
  });

  app.removeAllListeners("second-instance");

  app.on("second-instance", (_event, commandLine, _workingDirectory) => {
    // Someone tried to run a second instance
    scanArgv(commandLine, [defaultProtocol, "tel", "callto"]);
  });

  // Todo
  scanArgv(process.argv, [defaultProtocol, "tel", "callto"]);
}

export async function handlePotentialProtocolLaunch(url: string) {
  try {
    await pWaitFor(() => {
      return mainWindowState.getIsIpcReady();
    });

    const parsedUrl = new URL(url.replace(/\/$/, ""));

    switch (parsedUrl.protocol) {
      case "tel:":
      case "callto:":
        handleCallRequest(parsedUrl);
        break;
      default:
        return;
    }
  } catch (error) {
    console.error("Error handling protocol launch:", error);
  }
}

function scanArgv(argv: Array<string>, protocols: string[]) {
  const protocolArg = findProtocolArg(argv, protocols);
  if (protocolArg) {
    console.info("Found protocol arg in argv:", protocolArg);
    handlePotentialProtocolLaunch(protocolArg);
  }
}

export function findProtocolArg(argv: string[], protocols: string[]) {
  return argv.find((arg) => {
    return protocols.some((protocol) => arg.startsWith(`${protocol}:`));
  });
}

function handleCallRequest(parsedUrl: URL) {
  console.log("Handling call request:", parsedUrl);
}
