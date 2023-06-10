import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderDashboard from "../../components/Dashboard/Header";
import SidebarDashboard from "../../components/Dashboard/Sidebar";
import { useAppSelector } from "../../hooks/store";
import { useDebouncedCallback } from "use-debounce";

export default function Dashboard() {
  const { login } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const check = useDebouncedCallback(() => {
    if (!login) navigate("/login");
    else navigate("/dashboard");
  }, 3000);

  useEffect(() => {
    !login && check();
  }, [login]);

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
