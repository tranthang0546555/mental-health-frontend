import { Link } from "react-router-dom";
import LoginRegisterButton from "../LoginRegisterButton";
import ThemeSwitch from "../ThemeSwitch";
import "./index.css";

const maps: {
  path: string;
  name: string;
}[] = [
  { path: "/", name: "Trang chủ" },
  { path: "/post", name: "Bài viết" },
  { path: "/doctor", name: "Bác sĩ" },
  { path: "/contact", name: "Liên hệ" },
];
export default function Header() {
  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <a href="/">Mental Health</a>
          </h1>
          {/* <a href="/" className="logo me-auto">
            <img
              src="assets/img/apple-touch-icon.png"
              alt=""
              className="img-fluid"
            />
          </a> */}
          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              {maps.map(({ path, name }) => {
                const currentPath = location.pathname.split("/")?.[1];
                const p = path.split("/")?.[1];
                console.log(currentPath, p);

                return (
                  <li key={name}>
                    {/* <a
                      className={`nav-link scrollto ${
                        currentPath === p ? "active" : ""
                      }`}
                      href={path}
                    >
                      {name}
                    </a> */}
                    <Link
                      className={`nav-link scrollto ${
                        currentPath === p ? "active" : ""
                      }`}
                      to={path}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <Link to="/appointment" className="appointment-btn scrollto">
            Đặt lịch khám Online <span className="d-none d-md-inline"></span>
          </Link>

          <LoginRegisterButton />
          <ThemeSwitch />
        </div>
      </header>
    </>
  );
}
