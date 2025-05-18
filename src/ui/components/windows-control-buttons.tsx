// import React from "react";
export function WindowsControlButtons({
  windowName,
  isMaximizable = true,
  isMinimizable = true,
  isClosable = true,
}: {
  windowName: "main-window";
  isMaximizable?: boolean;
  isMinimizable?: boolean;
  isClosable?: boolean;
}) {
  return (
    __WIN32__ && (
      <div className="flex ml-auto">
        <button
          type="button"
          aria-label="Minimize"
          disabled={isMinimizable}
          className="px-3"
          onClick={() => {
            electronBridge.ipcRenderer.send("window-control", {
              windowName,
              control: "minimize",
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <button
          type="button"
          disabled={isMaximizable}
          aria-label="Maximize"
          className="px-3"
          onClick={() => {
            electronBridge.ipcRenderer.send("window-control", {
              windowName,
              control: "maximize",
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
          </svg>
        </button>
        <button
          disabled={!isClosable}
          type="button"
          aria-label="Close"
          className="px-3"
          onClick={() => {
            electronBridge.ipcRenderer.send("window-control", {
              windowName,
              control: "close",
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    )
  );
}
