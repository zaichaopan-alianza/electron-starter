import { app, Menu, MenuItemConstructorOptions, shell } from "electron";

function createTemplate() {
  const items: MenuItemConstructorOptions[] = [];

  if (__DARWIN__) {
    items.push({
      label: app.name,
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    });
  }

  items.push(
    {
      label: "File",
      submenu: [__DARWIN__ ? { role: "close" } : { role: "quit" }],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo", label: "Undo", accelerator: "CommandOrControl+Z" },
        { role: "redo", label: "Redo", accelerator: "CommandOrControl+Y" },
        { type: "separator" },
        { role: "cut", label: "Cut", accelerator: "CommandOrControl+Shift+X" },
        {
          role: "copy",
          label: "Copy",
          accelerator: "CommandOrControl+Shift+C",
        },
        {
          role: "paste",
          label: "Paste",
          accelerator: "CommandOrControl+Shift+Y",
        },
        { role: "delete", label: "Delete" },
        { type: "separator" },
        {
          role: "selectAll",
          label: "Select All",
          accelerator: "CommandOrControl+Shift+A",
        },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...((__DARWIN__
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]) as MenuItemConstructorOptions[]),
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            await shell.openExternal("https://electronjs.org");
          },
        },
      ],
    }
  );

  return items;
}

export function setupApplicationMenu() {
  const menu = Menu.buildFromTemplate(createTemplate());
  Menu.setApplicationMenu(menu);
}
