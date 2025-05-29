import { ContextMenuData } from "@/typed-ipc/channels";
import { typedIpcMain } from "@/typed-ipc/ipc-main";
import { push } from "@/typed-ipc/ipc-web-contents";
import { BrowserWindow, shell } from "electron";
import contextMenu from "electron-context-menu";

export function createContextMenu() {
  contextMenu({
    prepend: async (_defaultActions, parameters) => {
      const contextMenuData = await queryContextMenuData(
        parameters.selectionRect
      );

      if (
        contextMenuData?.type === "message" &&
        parameters.selectionText.trim().length === 0
      ) {
        return buildMessageContextMenu(contextMenuData.data.id);
      }

      return [
        {
          label: "Search Google for “{selection}”",
          // Only show it when right-clicking text
          visible: parameters.selectionText.trim().length > 0,
          click: () => {
            shell.openExternal(
              `https://google.com/search?q=${encodeURIComponent(
                parameters.selectionText
              )}`
            );
          },
        },
      ];
    },
  });
}

function buildMessageContextMenu(
  messageId?: string
): Array<Electron.MenuItemConstructorOptions> {
  if (!messageId) {
    return [];
  }

  return [
    {
      label: "Add reaction",
      click: () => {
        // Handle reply action
      },
    },
    {
      label: "Forward",
      click: () => {
        // Handle forward action
      },
    },
    { type: "separator" },
    {
      label: "Delete",
      click: () => {
        // Handle delete action
      },
    },
  ];
}

function queryContextMenuData(point: {
  x: number;
  y: number;
}): Promise<ContextMenuData | undefined> {
  push(BrowserWindow.getFocusedWindow(), "get-context-menu-element", point);

  return new Promise((resolve) => {
    typedIpcMain.once("context-menu-data", (_event, data) => {
      resolve(data);
    });
  });
}
