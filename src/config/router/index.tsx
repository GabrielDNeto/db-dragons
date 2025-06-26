import { createBrowserRouter } from "react-router";
import { APP_ROUTES } from "./routes";

import Signin from "@/pages/Signin";
import RouterGuard from "@/components/RouterGuard";
import Dragons from "@/pages/Dragons";

export const ROUTER = createBrowserRouter([
  {
    element: <RouterGuard />,
    children: [
      {
        path: APP_ROUTES.public.signin,
        element: <Signin />,
      },
      {
        path: APP_ROUTES.private.dragons,
        element: <Dragons />,
      },
    ],
  },
]);
