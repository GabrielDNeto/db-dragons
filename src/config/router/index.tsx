import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { APP_ROUTES } from "./routes";

import RouterGuard from "@/components/RouterGuard";
import DefaultTemplate from "@/components/templates/Default";
const Signin = lazy(() => import("@/pages/Signin"));
const Dragons = lazy(() => import("@/pages/Dragons/list"));

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
