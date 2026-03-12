import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Learn } from "./pages/Learn";
import { Stories } from "./pages/Stories";
import { Dictionary } from "./pages/Dictionary";
import { Contribute } from "./pages/Contribute";
import { MeetKiput } from "./pages/MeetKiput";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "learn", Component: Learn },
      { path: "stories", Component: Stories },
      { path: "dictionary", Component: Dictionary },
      { path: "contribute", Component: Contribute },
      { path: "meet-kiput", Component: MeetKiput },
    ],
  },
]);
