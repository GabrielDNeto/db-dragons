import { createBrowserRouter, Navigate } from "react-router";
import { APP_ROUTES } from "./routes";

import Signin from "@/pages/Signin";
import RouterGuard from "@/components/RouterGuard";
import Dragons from "@/pages/Dragons";
import DefaultTemplate from "@/components/templates/Default";

export const ROUTER = createBrowserRouter([
  {
    element: <RouterGuard />,
    children: [
      {
        path: APP_ROUTES.public.signin,
        element: <Signin />,
      },
      {
        element: <DefaultTemplate />,
        children: [
          {
            path: APP_ROUTES.private.dragons,
            element: <Dragons />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={APP_ROUTES.private.dragons} replace />,
  },
]);
