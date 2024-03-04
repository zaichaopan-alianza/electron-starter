import React from "react";
import ReactDOM from "react-dom/client";
import "@/ui/globals.css";
import { AppTitleBar } from "./app-title-bar";
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
  React.useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <div className="text-gray-100 flex flex-col flex-1 bg-gradient-to-r from-fuchsia-900 to-fuchsia-950">
      <AppTitleBar />
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
          <h1 className="text-3xl font-medium py-4">Sing in to your account</h1>

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
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
