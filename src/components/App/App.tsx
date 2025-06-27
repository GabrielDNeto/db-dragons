import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ROUTER } from "../../config/router";
import { AuthContextProvider } from "@/contexts/auth";
import React from "react";
import Suspense from "@/components/Suspense";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <React.Suspense fallback={<Suspense />}>
            <Toaster position="top-center" richColors />
            <RouterProvider router={ROUTER} />
          </React.Suspense>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
