import Header from "@/components/Header";
import { Outlet } from "react-router";

const DefaultTemplate = () => {
  return (
    <div>
      <Header />
      <section>
        <main className="container">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default DefaultTemplate;
