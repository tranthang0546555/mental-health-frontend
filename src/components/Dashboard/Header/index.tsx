import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { logOut } from "../../../store/authSlice";
import { avatarPath } from "../../../utils";
import ThemeSwitch from "../../ThemeSwitch";
import Notification from "./Notification";
import "./index.css";

export default function HeaderDashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleNavToggle = () => {
    const navToggle = document.documentElement.classList;
    if (navToggle?.contains("toggle-sidebar")) {
      navToggle.remove("toggle-sidebar");
    } else {
      navToggle?.add("toggle-sidebar");
    }
  };
  return (
    <header
      id="header-dashboard"
      className="header-dashboard fixed-top d-flex align-items-center"
    >
      <div className="d-flex align-items-center justify-content-between">
        <i
          id="toggle-sidebar-btn"
          className="bi bi-list toggle-sidebar-btn"
          onClick={handleNavToggle}
        ></i>
        <Link to="/" className="logo d-flex align-items-center">
          {/* <img src="assets/img/logo.png" alt="" /> */}
          <span className="d-none d-lg-block">Mental Health</span>
        </Link>
      </div>

      {/* <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div> */}

      <nav className="header-nav-dashboard ms-auto">
        <ul className="d-flex align-items-center">
          <Notification />
          <ThemeSwitch />
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src={avatarPath(user?.avatar)}
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {user?.name?.firstName}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <Link to="/dashboard/profile">
                  <h6>{user?.fullName}</h6>
                  <span>
                    {user?.email}
                  </span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/"
                >
                  <i className="bi bi-house"></i>
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              {/* <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-gear"></i>
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="pages-faq.html"
                >
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li> */}

              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => dispatch(logOut())}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Đăng xuất</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
