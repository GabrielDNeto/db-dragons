import { createBrowserRouter } from "react-router";
import { APP_ROUTES } from "./routes";
import Signin from "@/pages/Signin";

export const ROUTER = createBrowserRouter([
  {
    path: APP_ROUTES.public.signin,
    element: <Signin />,
  },
]);
