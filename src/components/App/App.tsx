import { RouterProvider } from "react-router";
import { ROUTER } from "../../config/router";

function App() {
  return (
    <>
      <RouterProvider router={ROUTER} />
    </>
  );
}

export default App;
