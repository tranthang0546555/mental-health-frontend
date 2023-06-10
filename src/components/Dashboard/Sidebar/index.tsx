import { Link } from "react-router-dom";
import "./index.css";
import { useAppSelector } from "../../../hooks/store";

type SidebarMenu = {
  name: string;
  path: string;
  role: Role[];
  icon?: React.ReactNode;
};
const sidebarMenus: SidebarMenu[] = [
  {
    name: "Thông tin",
    path: "/dashboard/profile",
    role: ["user", "doctor"],
    icon: <i className="bi bi-person"></i>,
  },
  {
    name: "Thông tin 2",
    path: "/dashboard/profile",
    role: ["user"],
  },
  {
    name: "Thông tin 3",
    path: "/dashboard/profile",
    role: ["user", "doctor"],
    icon: <i className="bi bi-person"></i>,
  },
];

export default function SidebarDashboard() {
  const currentRole = useAppSelector((state) => state.auth.user?.role);
  return (
    <aside id="sidebar-dashboard" className="sidebar sidebar-dashboard">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-heading">Pages</li>
        {sidebarMenus.map(({ name, path, role, icon }) => {
          if (role.includes(currentRole))
            return (
              <li className="nav-item" key={name}>
                <Link className="nav-link collapsed" to={path}>
                  {icon}
                  <span>{name}</span>
                </Link>
              </li>
            );
        })}
      </ul>
    </aside>
  );
}
