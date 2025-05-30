import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "@/ui/globals.css";
import { TitleBar } from "./title-bar";
import {
  createMemoryRouter,
  Link,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Home } from "./screens/home";
import team from "@/assets/team.svg";
import { Button } from "@/ui/components/base/button";
import { Input } from "@/ui/components/base/input";
import { CommandIcon } from "lucide-react";
import { Chat } from "./screens/Chat";
import { Meet } from "./screens/Meet";
import { Calls } from "./screens/Calls";
import {
  useContextMenu,
  useGetContextMenuElement,
} from "@/ui/hooks/use-get-context-menu-element";

const router = createMemoryRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: "chat",
            element: <Chat />,
            index: true,
          },
          {
            path: "meet",
            element: <Meet />,
          },
          {
            path: "calls",
            element: <Calls />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export function App() {
  const navigate = useNavigate();
  useGetContextMenuElement();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    electronBridge.ipcRenderer.send("ipc-ready", "main-window");
  }, []);

  useEffect(() => {
    return electronBridge.ipcRenderer.on("before-quit", () => {
      electronBridge.ipcRenderer.send("quit-app");
    });
  }, []);

  return (
    <div className="text-gray-100 flex flex-col flex-1 bg-gradient-to-r from-fuchsia-900 to-fuchsia-950">
      <TitleBar />
      <Outlet />
    </div>
  );
}

function Login() {
  return (
    <div className="flex flex-1 p-12">
      <div className="flex-1 flex justify-center items-center">
        <form className="flex flex-col gap-4 w-2/3">
          <CommandIcon size={36} />
          <h1
            className="text-3xl font-medi um py-4"
            {...useContextMenu({
              type: "message",
              data: { id: "1" },
            })}
          >
            Sing in to your account
          </h1>

          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <Button asChild className="bg-emerald-600 hover:bg-emerald-500">
            <Link to="/home/chat">Sign in to ACME</Link>
          </Button>
        </form>
      </div>
      <div
        className="flex-1 flex bg-no-repeat bg-contain bg-center"
        style={{
          backgroundSize: "70%",
          backgroundImage: `url("${team}")`,
        }}
      ></div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
