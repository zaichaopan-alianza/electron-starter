import React from "react";

export function TitleBar({
  left,
  middle,
  right,
  ...props
}: {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="app-region-drag flex h-11 items-stretch w-full" {...props}>
      <div className="flex flex-1">
        {__DARWIN__ && <div className="w-20"></div>}
        {left}
      </div>

      <div className="flex py-[0.3rem] relative flex-[2] test">{middle}</div>
      <div className="flex flex-1">{right}</div>
    </div>
  );
}
