import { Outlet } from "react-router-dom";
import HeaderDashboard from "../../components/Dashboard/Header";
import SidebarDashboard from "../../components/Dashboard/Sidebar";
import { useAppSelector } from "../../hooks/store";

export default function Dashboard() {
  const { login } = useAppSelector((state) => state.auth);

  if (!login) return <></>;
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
