import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ROUTER } from "../../config/router";
import { AuthContextProvider } from "@/contexts/auth";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={ROUTER} />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
