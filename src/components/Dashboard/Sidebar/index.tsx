import { Link } from "react-router-dom";
import "./index.css";
import { useAppSelector } from "../../../hooks/store";

type SidebarMenu = {
  name: string;
  path: string;
  role: Role[];
  icon?: React.ReactNode;
  children?: SidebarMenu[];
};
const sidebarMenus: SidebarMenu[] = [
  {
    name: "Bài viết",
    path: "/dashboard/post",
    role: ["doctor"],
    icon: <i className="bi bi-newspaper"></i>,
    children: [
      {
        name: "Danh sách",
        path: "/",
        role: ["doctor", "admin"],
      },
      {
        name: "Tạo mới",
        path: "/create",
        role: ["doctor", "admin"],
      },
    ],
  },
  {
    name: "Bài viết",
    path: "/dashboard/post",
    role: ["doctor"],
    icon: <i className="bi bi-newspaper"></i>,
    children: [
      {
        name: "Danh sách",
        path: "/",
        role: ["doctor", "admin"],
      },
      {
        name: "Tạo mới",
        path: "/create",
        role: ["doctor", "admin"],
      },
    ],
  },
  {
    name: "Thông tin",
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
        {sidebarMenus.map(({ name, path, role, icon, children }, index) => {
          if (role.includes(currentRole)) {
            if (children) {
              return (
                <li className="nav-item">
                  <a
                    className="nav-link collapsed"
                    data-bs-target={`#menu-${index}`}
                    data-bs-toggle="collapse"
                    href="#"
                    aria-expanded="false"
                  >
                    {icon}
                    <span>{name}</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </a>
                  <ul
                    id={`menu-${index}`}
                    className="nav-content collapse show"
                    data-bs-parent="#sidebar-nav"
                  >
                    {children.map((child) => (
                      <li>
                        <Link to={path + child.path}>
                          <i className="bi bi-circle"></i>
                          <span>{child.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <li className="nav-item" key={name}>
                <Link className="nav-link collapsed" to={path}>
                  {icon}
                  <span>{name}</span>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </aside>
  );
}
