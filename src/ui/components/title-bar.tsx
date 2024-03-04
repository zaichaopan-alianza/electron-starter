import React from "react";

export function TitleBar({
  left,
  middle,
  right,
}: {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="app-region-drag flex h-11 items-stretch w-full">
      <div className="flex flex-1">
        {__DARWIN__ && <div className="w-20"></div>}
        {left}
      </div>

      <div className="flex py-[0.3rem] relative flex-[2] test">{middle}</div>
      <div className="flex flex-1">
        {right}
        {__WIN32__ && (
          <div className="flex ml-auto">
            <button
              type="button"
              aria-label="Minimize"
              className="px-3"
              onClick={() => {
                electronBridge.windowControl({
                  windowName: "main-window",
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Maximize"
              className="px-3"
              onClick={() => {
                electronBridge.windowControl({
                  windowName: "main-window",
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
              type="button"
              aria-label="Close"
              className="px-3"
              onClick={() => {
                electronBridge.windowControl({
                  windowName: "main-window",
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
        )}
      </div>
    </div>
  );
}
