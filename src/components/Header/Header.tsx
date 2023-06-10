import LoginRegisterButton from "../LoginRegisterButton";
import "./index.css";

const maps: {
  path: string;
  name: string;
}[] = [
  { path: "/", name: "Home" },
  { path: "/news", name: "News" },
  { path: "/doctor", name: "Doctor" },
  { path: "/contact", name: "Contact" },
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
                return (
                  <li key={name}>
                    <a
                      className={`nav-link scrollto ${
                        currentPath === p ? "active" : ""
                      }`}
                      href={path}
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <a href="#appointment" className="appointment-btn scrollto">
            <span className="d-none d-md-inline">Make an</span> Appointment
          </a>

          <LoginRegisterButton />
        </div>
      </header>
    </>
  );
}
