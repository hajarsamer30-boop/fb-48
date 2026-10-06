import { NavbarCom } from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NavbarCom></NavbarCom>

      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
