import { Command, MessagesSquare, Phone, Video } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import profile from "@/assets/profile.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/base/dropdown-menu";

export function Home() {

  return (
    <div className="flex-1 flex pr-2 pb-1 text-white">
      <div className="w-[4.5rem] flex flex-col gap-5 items-center pt-1 pb-4">
        <div className="h-9 w-9 border flex justify-center items-center rounded-lg bg-white">
          {/* logo */}
          <Command size={24} className="text-fuchsia-950" />
        </div>
        <nav className="gap-3 flex flex-col items-center">
          <NavLink to="/home/chat">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-0.5 group">
                <span
                  className={`rounded-lg p-2 group-hover:bg-fuchsia-200/50 ${
                    isActive ? "bg-fuchsia-200/50" : ""
                  }`}
                >
                  <MessagesSquare
                    size={20}
                    strokeWidth={1.5}
                    aria-label="Chat"
                  />
                </span>

                <span className="text-xs">Chat</span>
              </div>
            )}
          </NavLink>

          <NavLink to="/home/calls">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-0.5 group">
                <span
                  className={`rounded-lg p-2 group-hover:bg-fuchsia-200/50 ${
                    isActive ? "bg-fuchsia-200/50" : ""
                  }`}
                >
                  <Phone size={20} strokeWidth={1.5} aria-label="Calls" />
                </span>

                <span className="text-xs">Calls</span>
              </div>
            )}
          </NavLink>

          <NavLink to="/home/meet">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-0.5 group">
                <span
                  className={`rounded-lg p-2 group-hover:bg-fuchsia-200/50 ${
                    isActive ? "bg-fuchsia-200/50" : ""
                  }`}
                >
                  <Video size={20} strokeWidth={1.5} aria-label="Meet" />
                </span>

                <span className="text-xs">Meet</span>
              </div>
            )}
          </NavLink>
        </nav>
        <div className="relative flex mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="relative flex">
                <img
                  className="rounded-lg w-10 object-cover"
                  src={profile}
                  alt="profile"
                />
                <div className="rounded-full flex justify-center items-center absolute z-10 bottom-0 right-0 h-3.5 w-3.5 translate-x-1/4 translate-y-1/4 bg-fuchsia-900 z-1">
                  <div className="rounded-full h-2.5 w-2.5 bg-green-600"></div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="w-72">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/login">Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 flex rounded bg-white overflow-hidden text-foreground">
        <Outlet />
      </div>
    </div>
  );
}
