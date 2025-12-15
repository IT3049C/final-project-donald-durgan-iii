import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
