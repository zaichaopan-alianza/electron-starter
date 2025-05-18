import React from "react";
import { TitleBar as BaseTitleBar } from "@/ui/components/title-bar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/ui/components/base/dialog";
import { Button } from "@/ui/components/base/button";
import { SearchCombobox } from "@/ui/components/search-combobox";
import { useLocation } from "react-router-dom";
import { WindowsControlButtons } from "@/ui/components/windows-control-buttons";

export function TitleBar() {
  const { pathname } = useLocation();

  return (
    <BaseTitleBar
      left={
        __WIN32__ ? (
          <Button
            onClick={(event) => {
              let { right: x, bottom: y } =
                event.currentTarget.getBoundingClientRect();
              x = x - 15;
              y = y - 15;
              electronBridge.ipcRenderer.send("show-application-menu", {
                x,
                y,
              });
            }}
            className="rounded-none outline-none hover:bg-transparent"
            variant="ghost"
            aria-label="ApplicationMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        ) : undefined
      }
      middle={pathname.includes("home") && <SearchModal />}
      right={<WindowsControlButtons windowName="main-window" />}
    />
  );
}

function SearchModal() {
  const dialogTriggerButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dialogTriggerButtonRef.current?.click();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  async function queryFn(query: string, signal: AbortSignal) {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`,
      {
        signal,
      }
    );
    return (await response.json()).items as Array<{
      full_name: string;
    }>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          ref={dialogTriggerButtonRef}
          type="button"
          className="flex flex-1 text-sm h-auto gap-2 text-gray-100 bg-fuchsia-200/50 hover:bg-fuchsia-200/50 hover:text-gray-100"
        >
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <div className="flex flex-1 text-xs">Search</div>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="translate-y-[0] top-[4.8px] max-w-none w-1/2 animate-none p-0"
        overlayClassName="bg-transparent animate-none"
      >
        <SearchCombobox
          queryFn={queryFn}
          renderPlaceholder={
            <div className="py-4 text-sm">
              Try searching for people, lists, or keywords
            </div>
          }
          renderEmptyState={() => (
            <div className="py-4 text-sm">Not result founds</div>
          )}
          renderErrorState={() => {
            return <div>Something wrong</div>;
          }}
        >
          {(item) => {
            return <div>{item.full_name}</div>;
          }}
        </SearchCombobox>
      </DialogContent>
    </Dialog>
  );
}
