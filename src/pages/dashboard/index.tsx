import { Outlet } from "react-router-dom";
import HeaderDashboard from "../../components/Dashboard/Header";
import SidebarDashboard from "../../components/Dashboard/Sidebar";

export default function Dashboard() {
  return (
    <>
      <HeaderDashboard />
      <SidebarDashboard />
      <main id="main-dashboard">
        <Outlet />
      </main>
    </>
  );
}
