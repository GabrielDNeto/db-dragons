import { APP_ROUTES } from "@/config/router/routes";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const RouterGuard = () => {
  const { authStatus } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("authStatus", authStatus);
    if (authStatus === "unauthorized") {
      navigate(APP_ROUTES.public.signin);
    } else if (
      authStatus === "authorized" &&
      pathname.includes(APP_ROUTES.public.signin)
    ) {
      navigate(APP_ROUTES.private.dragons);
    }
  }, [authStatus, navigate, pathname]);

  return <Outlet />;
};

export default RouterGuard;
