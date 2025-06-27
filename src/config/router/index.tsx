import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { APP_ROUTES } from "./routes";

import RouterGuard from "@/components/RouterGuard";
import DefaultTemplate from "@/components/templates/Default";
const Signin = lazy(() => import("@/pages/Signin"));
const Dragons = lazy(() => import("@/pages/Dragons/list"));
const CreateOrEditDragon = lazy(() => import("@/pages/Dragons/create-or-edit"));

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
          {
            path: `${APP_ROUTES.private.dragons}/create`,
            element: <CreateOrEditDragon />,
          },
          {
            path: `${APP_ROUTES.private.dragons}/:id`,
            element: <CreateOrEditDragon />,
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
