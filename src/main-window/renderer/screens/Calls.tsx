import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/ui/components/base/resizable";

export function Calls() {
  return (
    <ResizablePanelGroup direction="horizontal" className="rounded">
      <ResizablePanel
        minSize={12}
        defaultSize={20}
        maxSize={40}
        className="bg-fuchsia-950 text-gray-300"
      >
        <div className="text-lg font-semibold border-b-[0.5px] border-border/20 px-4 py-2">
          <div className="">Calls</div>
          <nav>
            <div></div>
          </nav>
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel></ResizablePanel>
    </ResizablePanelGroup>
  );
}
