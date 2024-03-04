import React from "react";
import { Input } from "@/ui/components/base/input";
import { ScrollIntoView } from "./scroll-into-view";
import debounce from "lodash/debounce";
import { Button } from "./base/button";

type Props<T> = {
  queryFn: (
    query: string,
    signal: AbortSignal | undefined
  ) => Promise<Array<T>>;
  children: (item: T) => React.ReactNode;
  renderErrorState: () => React.ReactNode;
  renderEmptyState: (query: string) => React.ReactNode;
  renderPlaceholder: React.ReactNode;
  onItemSelected?: (item: T) => void;
};

export function SearchCombobox<T>({
  queryFn,
  children,
  renderEmptyState,
  renderErrorState,
  renderPlaceholder,
  onItemSelected,
}: Props<T>) {
  const id = React.useId();
  const [state, setState] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const abortControllerRef = React.useRef<AbortController>(null);
  const [items, setItems] = React.useState<Array<T> | null>(null);

  function shift(toward: 1 | -1) {
    if (!items) {
      return;
    }

    setSelectedIndex((currentIndex) => {
      return (currentIndex + toward + items.length) % items.length;
    });
  }

  async function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const value = e.target.value;
      setQuery(value);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      setState("loading");
      const data = await queryFn(value, abortController.signal);
      setItems(data);
      setState("success");
      setSelectedIndex(0);
    } catch (error) {
      console.log("error", error);
      setState("error");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.code === "ArrowDown") {
      shift(1);
      return;
    }

    if (e.code === "ArrowUp") {
      e.preventDefault();
      shift(-1);
      return;
    }

    if (e.code === "Enter") {
      onItemSelected?.(items[selectedIndex]);
    }
    return;
  }

  return (
    <div className="relative w-full">
      <div className="flex p-1 pr-8">
        <Input
          type="text"
          aria-label="Search"
          placeholder="Search"
          aria-haspopup="listbox"
          role="combobox"
          aria-expanded
          aria-autocomplete="list"
          {...(selectedIndex !== -1 && {
            ["aria-activedescendant"]: `listbox-${id}-${selectedIndex}`,
          })}
          aria-controls={`listbox-${id}`}
          autoComplete="off"
          className="flex flex-1 px-3 py-2 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none border-none"
          autoFocus
          onKeyDown={handleKeyDown}
          onChange={debounce(handleValueChange, 200)}
        />

        <Button variant="ghost" className="h-8 px-1 self-center text-xs">
          Clear
        </Button>
        <span className="h-5 border-r ml-3 mr-4 self-center"></span>
      </div>

      <div role="presentation" className="w-full border-t">
        <div
          id={`listbox-${id}`}
          role="listbox"
          tabIndex={-1}
          className="overflow-auto max-h-[50vh] overflow-y-auto p-2"
          aria-label="Suggestions"
        >
          {query === "" ? (
            <div className="px-3">{renderPlaceholder}</div>
          ) : state === "loading" ? (
            <div className="py-4 flex justify-center">Loading...</div>
          ) : state === "success" ? (
            items?.length > 0 ? (
              items.map((item, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <ScrollIntoView<HTMLDivElement>
                    active={isSelected}
                    key={index}
                  >
                    {(ref) => {
                      return (
                        <div
                          onMouseEnter={() => setSelectedIndex(index)}
                          id={`listbox-${id}-${index}`}
                          role="option"
                          ref={ref}
                          tabIndex={-1}
                          aria-selected={isSelected}
                          className={`p-2 text-sm rounded ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : ""
                          }`}
                        >
                          {children(item)}
                        </div>
                      );
                    }}
                  </ScrollIntoView>
                );
              })
            ) : (
              <div className="px-3">{renderEmptyState(query)}</div>
            )
          ) : (
            <div className="px-3">{renderErrorState()}</div>
          )}
        </div>
      </div>
    </div>
  );
}
