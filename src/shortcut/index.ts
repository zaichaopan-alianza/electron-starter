import { tinykeys } from "tinykeys";

export function registerShortcuts() {
  // Register shortcuts
  tinykeys(window, {
    "Shift+D": () => {
      alert("The 'Shift' and 'd' keys were pressed at the same time");
    },
    "y e e t": () => {
      alert("The keys 'y', 'e', 'e', and 't' were pressed in order");
    },
    "$mod+([0-9])": (event) => {
      event.preventDefault();
      alert(
        `Either 'Control+${event.key}' or 'Meta+${event.key}' were pressed`
      );
    },
  });
}

// context menu
// element.addEventListener("contextmenu")
// useContextMenu
// image/link/text
//

