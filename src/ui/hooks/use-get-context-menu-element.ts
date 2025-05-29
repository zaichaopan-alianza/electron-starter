import type { ContextMenuData } from "@/typed-ipc/channels";
import { useEffect, useMemo } from "react";

export function useGetContextMenuElement() {
  return useEffect(() => {
    return electronBridge.ipcRenderer.on(
      "get-context-menu-element",
      (point) => {
        const el = document
          .elementFromPoint(point.x, point.y)
          ?.closest("[data-context-menu]");

        const contextMenu = (el as HTMLElement).dataset.contextMenu;
        electronBridge.ipcRenderer.send(
          "context-menu-data",
          contextMenu ? JSON.parse(contextMenu) : undefined
        );
      }
    );
  }, []);
}

// and show context menu for that message like add reaction, delete message
export function useContextMenu(data?: ContextMenuData) {
  return useMemo(() => {
    return {
      ["data-context-menu"]: JSON.stringify(data ?? {}),
    };
  }, [data]);
}
